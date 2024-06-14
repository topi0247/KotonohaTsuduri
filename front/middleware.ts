import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();

  response.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  response.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");

  return response;
}

export const config = {
  matcher: "/",
};
