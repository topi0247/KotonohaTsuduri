import "@mantine/core/styles.css";
import "./globals.css";

import * as Layouts from "@/components/layouts";
import * as Provider from "@/provider";

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
        {/* 句読点だけKlee One */}
        <link
          href="https://fonts.googleapis.com/css2?family=Klee+One&text=、。&display=swap"
          rel="stylesheet"
        />
        {/* 基本の文字はLXGW WenKai TC */}
        <link
          href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider.Provider>
          <Layouts.MainLayout>{children}</Layouts.MainLayout>
        </Provider.Provider>
      </body>
    </html>
  );
}
