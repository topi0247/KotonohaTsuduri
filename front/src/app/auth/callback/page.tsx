"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import { setToken } from "@/lib";

function AuthCallbackPageContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const setTokenAndClose = async () => {
      const accessToken = searchParams.get("token");
      const uid = searchParams.get("uid");
      const expiry = searchParams.get("expiry");
      const client = searchParams.get("client");

      if (accessToken && uid && expiry && client) {
        setToken({ accessToken, uid, expiry, client });
        window.close();
      }
    };

    setTokenAndClose();
  }, [searchParams]);
  return <></>;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<></>}>
      <AuthCallbackPageContent />
    </Suspense>
  );
}
