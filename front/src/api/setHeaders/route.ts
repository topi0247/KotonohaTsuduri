// app/api/setHeaders/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const headers = new Headers();
  headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");

  return NextResponse.json({ message: "Success" }, { headers });
}
