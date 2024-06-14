"use client";

import { Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { Routes, getEnv } from "@/config";
import { DetailModal } from "@/features/posts";
import { axiosClient } from "@/lib";

const fetcher = (url: string) =>
  axiosClient()
    .get(url)
    .then((res) => res.data);

export default function Post({ params }: { params: { id: string } }) {
  const { id } = params;
  const [opened, { open, close }] = useDisclosure(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const onChange = (value: number) => {
    setPage(value);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleXShare = () => {
    const url = `https://twitter.com/intent/tweet?text=お手紙みっけ%0a&hashtags=言の葉つづり_topi&url=${getEnv("URL")}/posts/${id}`;
    const left = (window.screen.width - 500) / 2;
    const top = (window.screen.height - 500) / 2;
    const params = `width=700,height=500,left=${left},top=${top}`;
    window.open(url, "言の葉つづり Xシェア", params);
  };

  return (
    <>
      <article className="letter-detail container m-auto flex flex-col items-center justify-center">
        <div className="w-full max-w-[800px] flex-grow">
          <h1 className="text-center text-xl">とある手紙の物語</h1>
          <section className="py-2">
            <button type="button" onClick={open} className="stripe-pattern-sky">
              どんな手紙？
            </button>
          </section>
          {Letter({ open, page, uuid: id, setPageCount })}
          <section className="mb-4 mt-2">
            <div className="m-auto flex w-full items-center justify-between gap-4 px-4">
              <Link href={Routes.posts} className="rounded bg-slate-500 px-2 py-1 text-white">
                一覧に戻る
              </Link>
              <div className="flex items-center justify-center gap-4">
                <button
                  className="rounded bg-slate-900 px-2 py-1 text-white"
                  rel="noopener noreferrer"
                  onClick={handleXShare}
                  type="button"
                >
                  Xシェア
                </button>
                <Link href={Routes.reply(id)} className="rounded bg-sky-500 px-2 py-1 text-white">
                  返信する
                </Link>
              </div>
            </div>
          </section>
        </div>
        <div style={{ display: "none" }}>{Letter({ open, page: page + 1, uuid: id })}</div>
        <div className="pagination bottom-0 left-0 m-auto flex w-full max-w-[500px] items-center justify-center rounded bg-sky-200 bg-opacity-50 p-4">
          <Pagination
            withEdges
            total={pageCount}
            siblings={1}
            defaultValue={1}
            value={page}
            onChange={onChange}
          />
        </div>
      </article>
      <DetailModal opened={opened} onClose={close} uuid={id} lettersCount={pageCount} />
    </>
  );
}

function Letter({
  page,
  uuid,
  setPageCount,
}: {
  open: () => void;
  page: number;
  uuid: string;
  setPageCount?: (value: number) => void;
}) {
  const { data } = useSWR(`/posts/${uuid}?page=${page}`, fetcher);

  useEffect(() => {
    if (data && setPageCount) {
      setPageCount(data.all_count);
    }
  }, [data, setPageCount]);

  if (data === undefined) {
    return <p>ちょっとまってね</p>;
  }

  if (data.letter == null) return;

  return (
    <>
      {data === undefined ? (
        <p>ちょっとまってね</p>
      ) : (
        <section className="m-auto my-2 bg-white p-4 px-8">
          <p className="border-b border-sky-200 text-end">{data.letter.name} より</p>
          <p className="border-b border-sky-200 pt-1 text-end text-sm text-gray-400">
            {data.letter.created_at}
          </p>
          <p className="lined-textarea whitespace-pre-wrap leading-7">{data.letter.sentences}</p>
        </section>
      )}
    </>
  );
}
