import "./globals.css";
import * as Layouts from "@/components/layouts";

import type { Metadata } from "next";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Layouts.MainLayout>{children}</Layouts.MainLayout>
      </body>
    </html>
  );
}
