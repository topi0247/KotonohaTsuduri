"use client";

import * as Layout from "@/components/layouts";
import { Notification } from "@/components/ui";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-sky-100">
      <header>
        <Layout.Headers />
      </header>
      <Notification />
      <main className="mx-4 my-4 flex-grow">{children}</main>
      <footer>
        <Layout.Footers />
      </footer>
    </div>
  );
}
