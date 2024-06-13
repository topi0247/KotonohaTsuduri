"use client";

import Link from "next/link";
import { useRecoilValue } from "recoil";

import { Routes } from "@/config";
import { userState } from "@/hooks";

export default function Home() {
  const user = useRecoilValue(userState);

  const isLogged = user.uuid !== "";

  return (
    <article>
      <section className="my-4 flex flex-col items-center justify-center gap-2 text-center">
        <p>ここはとっても不思議な場所</p>
        <p>いろんな世界の手紙が流れ着く</p>
        <p>誰かに宛てたその手紙</p>
        <p>ちょっと覗いて見てみよう</p>
        <p>ほら、あなたに宛てた手紙があるよ</p>
        <p>早く返信しなきゃ</p>
        <p>もちろんあなたから送ってもいいよ</p>
      </section>
      <section className="my-8 text-center">
        <h1 className="text-2xl">言の葉つづり</h1>
        <h2>～手紙の向こうは知らない世界～</h2>
      </section>
      <section className="flex flex-col items-center justify-center gap-4">
        {isLogged ? (
          <>
            <Link href={Routes.newPost} className="rounded bg-orange-400 px-2 py-1 text-white">
              手紙を綴る
            </Link>
            <Link href={Routes.posts} className="rounded bg-sky-400 px-2 py-1 text-white">
              手紙を読みに行く
            </Link>
          </>
        ) : (
          <>
            <Link href={Routes.login} className="rounded bg-orange-400 px-2 py-1 text-white">
              さっそく綴る！
            </Link>
            <Link href={Routes.posts} className="rounded bg-sky-400 px-2 py-1 text-white">
              まずは手紙を読む
            </Link>
          </>
        )}
      </section>
    </article>
  );
}
