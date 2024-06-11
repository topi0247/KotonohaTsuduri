import * as Layout from "@/components/layouts";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lxgw-wenkai-tc-regular flex min-h-screen flex-col bg-sky-100">
      <header>
        <Layout.Headers />
      </header>
      <main className="flex-grow">{children}</main>
      <footer>
        <Layout.Footers />
      </footer>
    </div>
  );
}
