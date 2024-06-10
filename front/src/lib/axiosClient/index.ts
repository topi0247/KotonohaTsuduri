import axios from "axios";

import { getEnv } from "@/config";
import { getToken } from "@/lib";

export default function axiosClient() {
  const tokens = getToken();
  const client = axios.create({
    baseURL: getEnv("API_URL") || getEnv("NEXT_PUBLIC_API_URL") || "",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // トークンセット
  client.interceptors.request.use((config) => {
    const newConfig = { ...config };
    if (tokens.accessToken && tokens.uid && tokens.expiry && tokens.client) {
      newConfig.headers["access-token"] = tokens.accessToken;
      newConfig.headers.uid = tokens.uid;
      newConfig.headers.expiry = tokens.expiry;
      newConfig.headers.client = tokens.client;
    }
    return newConfig;
  });
  return client;
}
