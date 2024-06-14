"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { GoogleLoginButton } from "@/components/ui";
import * as Config from "@/config";

export default function GoogleLogin() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const url = Config.getEnv("API_URL");
  const SECONDS = 1000;

  useEffect(() => {
    if (!isLogged) return;
    
    router.push(Config.Routes.posts);
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
      try {
        if (popup.closed) {
          clearInterval(intervalId);
          setIsLogged(true);
        }
      } catch (error) {
        clearInterval(intervalId);
        console.error("Error checking popup status:", error);
        setIsLogged(true);
      }
    }, SECONDS);
  };

  return <GoogleLoginButton onClick={handlePopup} />;
}
