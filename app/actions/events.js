"use server";

import { supabase } from "@/lib/supabase";
import { getSession } from "./auth";
import { redirect } from "next/navigation";

// VERY basic in-memory rate limiting map. 
// In a serverless environment, this resets often, but since we are handling small loads or it's a test assignment, it works as a functional basic implementation.
const rateLimitCache = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  if (!rateLimitCache.has(ip)) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  const record = rateLimitCache.get(ip);
  if (now > record.resetTime) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= MAX_REQUESTS) {
    return false;
  }
  
  record.count += 1;
  return true;
}


export async function registerEvent(formData) {
  const session = await getSession();
  if (!session) {
    return { error: "You must be logged in to register." };
  }

  // A generic way to get IP in Next.js from headers if possible, or fallback to user id for rate limit
  const identifier = session.id; 
  if (!checkRateLimit(identifier)) {
    return { error: "Rate limit exceeded. Please try again later." };
  }

  const eventName = formData.get("eventName");
  const numParticipants = parseInt(formData.get("numParticipants"));
  
  const registrations = [];
  
  for (let i = 1; i <= numParticipants; i++) {
    const name = formData.get(`p${i}-name`);
    const s_class = formData.get(`p${i}-class`);
    const contact = formData.get(`p${i}-contact`);
    if (name && s_class && contact) {
      registrations.push({
        event_name: eventName,
        registered_by: session.id,
        participant_name: name.toString(),
        participant_class: s_class.toString(),
        participant_contact: contact.toString()
      });
    }
  }

  if (registrations.length === 0) {
    return { error: "No valid participants provided." };
  }

  const { error: delError } = await supabase
    .from("event_registrations")
    .delete()
    .eq("registered_by", session.id)
    .eq("event_name", eventName);

  if (delError) {
    console.error("Supabase delete old error:", delError);
  }

  const { error } = await supabase
    .from("event_registrations")
    .insert(registrations);

  if (error) {
    console.error("Supabase insert error:", error);
    return { error: "Failed to register. Please try again." };
  }

  redirect("/portal");
}

export async function getUserRegistrations() {
  const session = await getSession();
  if (!session) return { data: null, error: "Unauthorized" };

  const { data, error } = await supabase
    .from("event_registrations")
    .select("*")
    .eq("registered_by", session.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error: "Failed to fetch registrations" };
  }

  return { data };
}
