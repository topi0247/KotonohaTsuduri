export default function getEnv(key: string) {
  switch (key) {
    case "API_URL":
      return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";
    case "URL":
      return process.env.URL || process.env.NEXT_PUBLIC_URL || "";
    case "GOOGLE_ANALYTICS_ID":
      return process.env.GOOGLE_ANALYTICS_ID || "";
    default:
      return "";
  }
}
