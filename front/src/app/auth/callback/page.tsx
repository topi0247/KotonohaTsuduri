"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { getEnv } from "@/config";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const parentWindow: Window | null = window.opener as (Window & typeof globalThis) | null;

    if (!parentWindow) {
      window.close();
      return;
    }

    const status = searchParams.get("status");

    if (status === "failure") {
      parentWindow.postMessage({ status: "error" }, `${getEnv("URL")}/login`);
      window.close();
      return;
    }

    const accessToken = searchParams.get("token");
    const uid = searchParams.get("uid");
    const expiry = searchParams.get("expiry");
    const client = searchParams.get("client");

    if (accessToken && uid && expiry && client) {
      parentWindow.postMessage({ accessToken, uid, expiry, client }, `${getEnv("URL")}/login`);
      window.close();
    }
  }, []);
}
