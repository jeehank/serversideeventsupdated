"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

const secretKey = process.env.JWT_SECRET || "fallbacksecret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function decrypt(input) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function login(formData) {
  const username = formData.get("username").toString();
  const password = formData.get("password").toString();

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (error || !data) {
    return { error: "Invalid username or password" };
  }

  const session = await encrypt({ id: data.id, role: data.role, username: data.username });
  
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  if (data.role === "admin") {
    redirect("/admin");
  } else {
    redirect("/events");
  }
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
  redirect("/");
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function createAccount(formData) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const newUsername = formData.get("username").toString();
  const newPassword = formData.get("password").toString();

  const { error } = await supabase
    .from("accounts")
    .insert([{ username: newUsername, password: newPassword, role: "user" }]);

  if (error) {
    return { error: "Failed to create account. Username might already exist." };
  }

  return { success: "Account created successfully" };
}
