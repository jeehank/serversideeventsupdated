"use client";
// this is not client component its js to track when someone is clicking on the alt key
// if someone clicks on alt it will take them to the events page
// u can change this add connect it to the register now page i didnt wanna mess w ur backend
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Events() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Alt") {
        e.preventDefault();
        if (pathname !== "/events") {
          router.push("/events");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, pathname]);

  return null;
}
