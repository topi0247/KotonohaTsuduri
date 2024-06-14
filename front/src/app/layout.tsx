import "@mantine/core/styles.css";
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

import * as Layouts from "@/components/layouts";
import { getEnv } from "@/config";
import * as Provider from "@/provider";

import type { Metadata } from "next";

const URL = getEnv("URL");

export const metadata: Metadata = {
  title: {
    template: "%s | 言の葉つづり",
    default: "言の葉つづり",
  },
  description: "手紙の向こうは知らない世界",
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: "言の葉つづり",
    description: "手紙の向こうは知らない世界",
    url: URL,
    siteName: "言の葉つづり",
    images: `${URL}/assets/OGP.png`,
    type: "website",
  },
  icons: {
    icon: `${URL}/assets/favicon.ico`,
  },
  twitter: {
    card: "summary_large_image",
    title: "言の葉つづり",
    description: "手紙の向こうは知らない世界",
    images: `${URL}/assets/OGP.png`,
  },
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
          href="https://fonts.googleapis.com/css2?family=Klee+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider.Provider>
          <Layouts.MainLayout>{children}</Layouts.MainLayout>
        </Provider.Provider>
      </body>
      {getEnv("GOOGLE_ANALYTICS_ID") && (
        <>
          <GoogleAnalytics gaId={getEnv("GOOGLE_ANALYTICS_ID")} />
          <Analytics />
        </>
      )}
    </html>
  );
}
