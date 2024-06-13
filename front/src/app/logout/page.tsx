"use client";

import Link from "next/link";

import { Routes } from "@/config";

export default function Logout() {
  const onClick = () => {};

  return (
    <article className="container mx-auto my-8 text-center">
      <h1>ばいばいする？</h1>
      <section className="flex flex-col items-center justify-center gap-3">
        <button onClick={() => onClick}>ばいばい</button>
        <Link href={Routes.posts}>もっと読む！</Link>
      </section>
    </article>
  );
}
