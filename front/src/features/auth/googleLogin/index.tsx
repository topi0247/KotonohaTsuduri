"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { GoogleLoginButton } from "@/components/ui";
import * as Config from "@/config";
import { useAuth } from "@/hooks";
import * as Lib from "@/lib";

export default function GoogleLogin() {
  const router = useRouter();
  const { autoLogin } = useAuth();
  const [isLogged, setIsLogged] = useState(false);
  const url = Config.getEnv("API_URL");
  const SECONDS = 1000;

  useEffect(() => {
    const handleMessage =(event: MessageEvent) => {
      // セキュリティのためオリジンを確認
      if (event.origin !== Config.getEnv("URL")) return;

      const data = event.data as
        | { accessToken: string; uid: string; expiry: string; client: string }
        | { status: string };

      if ("accessToken" in data) {
        const { accessToken, uid, expiry, client } = data;
        Lib.setToken({ accessToken, uid, expiry, client });
        autoLogin();
      }

      setIsLogged(true);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!isLogged) return;
    const tokens = Lib.getToken();
    if (tokens.accessToken && tokens.uid && tokens.expiry && tokens.client) {
      router.push(Config.Routes.posts);
      return;
    }

    router.push(Config.Routes.authFailure);
  }, [isLogged]);

  const handlePopup = () => {
    const top = window.screenY + (window.outerHeight - 600) / 2;
    const left = window.screenX + (window.outerWidth - 600) / 2;
    const popup = window.open(
      `${url}/auth/google_oauth2`,
      "GoogleLogin",
      `width=600,height=600,top=${top},left=${left}`,
    );

    if (!popup) {
      return;
    }

    const intervalId = setInterval(() => {
      if (popup.closed) {
        clearInterval(intervalId);
        setIsLogged(true);
      }
    }, SECONDS);
  };

  return <GoogleLoginButton onClick={handlePopup} />;
}
