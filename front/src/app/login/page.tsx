"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import * as Config from "@/config";
import { GoogleLoginButton } from "@/features/auth";
import * as Lib from "@/lib";

export default function Login() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const url = Config.getEnv("API_URL");
  const SECONDS = 1000;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // セキュリティのためオリジンを確認
      if (event.origin !== Config.getEnv("URL")) return;

      const data = event.data as
        | { accessToken: string; uid: string; expiry: string; client: string }
        | { status: string };

      if ("accessToken" in data) {
        const { accessToken, uid, expiry, client } = data;
        Lib.setToken({ accessToken, uid, expiry, client });
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
    console.log(tokens.accessToken, tokens.uid, tokens.expiry, tokens.client);
    if (tokens.accessToken && tokens.uid && tokens.expiry && tokens.client) {
      router.push(Config.Routes.home);
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

  return (
    <article>
      <section>
        <h1>筆をとる</h1>
        <div>
          <GoogleLoginButton onClick={handlePopup} />
        </div>
      </section>
    </article>
  );
}
