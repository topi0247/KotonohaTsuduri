"use client";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { Routes } from "@/config";
import { axiosClient } from "@/lib";

const fetcher = (url: string) =>
  axiosClient()
    .get(url)
    .then((res) => res.data);

export default function Posts() {
  const [opened, { open, close }] = useDisclosure(false);
  const [cnt, setCnt] = useState(1);
  const [currentUuid, setCurrentUuid] = useState<string>("");

  const handleClick = (uuid: string) => {
    open();
    setCurrentUuid(uuid);
  };

  const { data: Tags } = useSWR(`/posts/${currentUuid}/tags`, fetcher);
  const { data: Genres } = useSWR(`/posts/${currentUuid}/genres`, fetcher);

  const pages = [];
  for (let i = 1; i <= cnt; i++) {
    pages.push(<Page key={i} index={i} onClick={handleClick} />);
  }

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
      const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
      if (isScrolledToBottom) {
        setCnt((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <article className="container relative m-auto">
        <h1 className="text-center text-xl">みんなの手紙</h1>
        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {pages}
        </div>
      </article>
      <Modal opened={opened} onClose={close} title="どんな手紙？">
        <div className="relative mt-8 bg-white px-2">
          <h3>
            <span className="border-b border-sky-600 px-2">ジャンル</span>
          </h3>
          <ul className="border-b border-dashed border-sky-300 pb-2">
            {Genres === undefined ? (
              <li>ちょっとまってね</li>
            ) : Genres?.length === 0 ? (
              <li>ないみたい</li>
            ) : (
              Genres?.map((genre: string) => <li key={genre}>{genre}</li>)
            )}
          </ul>
          <h3 className="pt-2">
            <span className="border-b border-sky-600 px-2">タグ</span>
          </h3>
          <ul>
            {Tags === undefined ? (
              <li>ちょっとまってね</li>
            ) : Tags?.length === 0 ? (
              <li>ないみたい</li>
            ) : (
              Tags.map((tag: string) => <li key={tag}>{tag}</li>)
            )}
          </ul>
          <div className="absolute bottom-8 right-0 opacity-50">
            <div className="postmark">
              1<span className="text-sm">通</span>
            </div>
          </div>
          <div className="text-end">
            <Link
              href={Routes.post(currentUuid)}
              className="stripe-pattern-orange px-2 text-slate-700"
            >
              手紙を読む
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}

function Page({ index, onClick }: { index: number; onClick: (uuid: string) => void }) {
  const { data } = useSWR(`/posts?page=${index}`, fetcher);

  if (!data) {
    return <div>ちょっとまってね</div>;
  }

  return data.posts.map(
    ({
      uuid,
      letters,
    }: {
      uuid: string;
      letters: {
        name: string;
        sentences: string;
        count: number;
      };
    }) => (
      <section className="envelope-container group" key={uuid}>
        <div className="envelope envelope1 relative">
          <div className="card absolute overflow-hidden">
            <div className="absolute top-0 z-20 whitespace-pre-wrap p-4 text-sm">
              {letters.sentences}
            </div>
          </div>
          <div className="absolute -left-[140px] top-[230px] z-10 flex w-[280px] flex-col items-start justify-center gap-3 text-sm">
            <button
              type="button"
              className="stripe-pattern-sky px-2 text-slate-700"
              onClick={() => onClick(uuid)}
            >
              どんな手紙？
            </button>
            <Link href={Routes.post(uuid)} className="stripe-pattern-orange px-2 text-slate-700">
              手紙を読む
            </Link>
          </div>
          <div className="absolute -right-[120px] top-[200px] z-10 flex flex-col items-start justify-center gap-3 text-sm">
            <div className="postmark">
              {letters.count}
              <span className="text-sm">通</span>
            </div>
          </div>
          <div className="absolute -right-[140px] top-[275px] z-10 flex w-[180px] flex-col items-start justify-center gap-3 text-end text-sm">
            <p className="w-full">{letters.name} より</p>
          </div>
        </div>
        {letters.count > 1 && (
          <div className="envelope envelope2 relative">
            <div className="card absolute"></div>
          </div>
        )}
        {letters.count > 2 && (
          <div className="envelope envelope3 relative">
            <div className="card absolute"></div>
          </div>
        )}
        {letters.count > 3 && (
          <div className="envelope envelope4 relative">
            <div className="card absolute"></div>
          </div>
        )}
        {letters.count > 4 && (
          <div className="envelope envelope5 relative">
            <div className="card absolute"></div>
          </div>
        )}
      </section>
    ),
  );
}
