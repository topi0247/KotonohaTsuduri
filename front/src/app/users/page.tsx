"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { Routes } from "@/config";
import { axiosClient } from "@/lib";

export default function Users() {
  const [cnt, setCnt] = useState(1);
  const allUsersCountRef = useRef(1);
  const PER_PAGE = 48;

  const setUsersCount = (allPostsCount: number) => {
    allUsersCountRef.current = allPostsCount;
  };

  const pages = [];
  for (let i = 1; i <= cnt; i++) {
    pages.push(<UserLink key={i} index={i} setUsersCount={setUsersCount} />);
  }

  const handleScroll = useCallback(() => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
    const allPage = Math.ceil(allUsersCountRef.current / PER_PAGE);
    if (isScrolledToBottom && cnt + 1 <= allPage) {
      setCnt((prev) => prev + 1);
    }
  }, [setCnt, cnt, allUsersCountRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <article className="container relative m-auto">
      <h1 className="text-center text-xl">みんなの世界</h1>
      <p className="text-center text-sm">手紙を投稿した人だけだよ</p>
      <section className="my-4">
        <div className="mx-4 grid grid-cols-1 md:m-auto md:grid-cols-4 md:gap-x-4 md:gap-y-8">
          {pages}
        </div>
      </section>
    </article>
  );
}

const fetcher = (url: string) =>
  axiosClient()
    .get(url)
    .then((res) => res.data);

function UserLink({
  index,
  setUsersCount,
}: {
  index: number;
  setUsersCount: (allUsersCount: number) => void;
}) {
  const { data } = useSWR(`/users?page=${index}`, fetcher);

  if (!data) {
    return;
  }

  setUsersCount(data.all_count);
  return data.users.map(({ uuid, name }: { uuid: string; name: string }, index: number) => (
    <div
      className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"} md:justify-start`}
      key={uuid}
    >
      <Link
        href={Routes.user(uuid)}
        className={`box relative z-0 text-sky-500 transition-all before:absolute ${index % 2 === 0 ? "before:left-0" : "before:right-0 md:before:right-auto"} before:top-0 before:-z-10 before:h-8 before:w-12 before:-rotate-12 before:bg-white before:transition-all before:duration-300 before:content-[''] hover:before:bg-sky-200 hover:before:[transform:rotateY(180deg)]`}
      >
        <span
          className={`border-sky-500 pb-1 ${index % 2 === 0 ? "pr-6" : "pl-6"} md:pl-0 md:pr-6`}
        >
          {name}
        </span>
      </Link>
    </div>
  ));
}
