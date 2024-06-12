import { MantineProvider } from "@mantine/core";

import * as Layout from "@/components/layouts";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lxgw-wenkai-tc-regular flex min-h-screen flex-col bg-sky-100">
      <MantineProvider>
        <header>
          <Layout.Headers />
        </header>
        <main className="mx-4 my-4 flex-grow">{children}</main>
        <footer>
          <Layout.Footers />
        </footer>
      </MantineProvider>
    </div>
  );
}
