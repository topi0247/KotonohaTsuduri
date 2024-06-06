import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "言の葉つづり",
  description: "手紙の向こうは知らない世界",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
