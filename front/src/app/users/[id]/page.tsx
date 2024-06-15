"use client";

import { SegmentedControl } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR from "swr";

import { Letters } from "@/features/posts";
import { userState } from "@/hooks";
import { axiosClient } from "@/lib";

const fetcher = (url: string) =>
  axiosClient()
    .get(url)
    .then((res) => res.data);

enum TabType {
  First = "first",
  Reply = "reply",
}

export default function User({ params: { id } }: { params: { id: string } }) {
  const { data } = useSWR(`/users/${id}/show_user`, fetcher);
  const user = useRecoilValue(userState);
  const [tabType, setTabType] = useState<TabType>(TabType.First);
  const currentPostAllCount = useRef(1);
  const currentUuid = useRef<string>("");
  const [cnt, setCnt] = useState(1);
  const PER_PAGE = 12;

  const setPostsCount = (allPostsCount: number) => {
    currentPostAllCount.current = allPostsCount;
  };

  const handleClick = (uuid: string, lettersCount: number) => {
    open();
    currentUuid.current = uuid;
    currentPostAllCount.current = lettersCount;
  };

  const pages = [];
  for (let i = 1; i <= cnt; i++) {
    pages.push(
      <Letters
        key={i}
        url={`/users/${id}?tag=${tabType}&page=${i}`}
        onClick={handleClick}
        setPostsCount={setPostsCount}
      />,
    );
  }

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
      const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
      const allPage = Math.ceil(currentPostAllCount.current / PER_PAGE);
      if (isScrolledToBottom && cnt + 1 <= allPage) {
        setCnt((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!data) {
    return <div>ちょっとまってね</div>;
  }

  return (
    <article className="relative h-full">
      <section className="flex items-center justify-between">
        <h1>{data} さんの世界</h1>
        {user.uuid === id && (
          <button className="rounded bg-sky-500 px-2 py-1 text-sm text-white">名前を変える</button>
        )}
      </section>
      <section className="relative">
        <div className="sticky top-0 z-10 my-4 text-center">
          <SegmentedControl
            value={tabType}
            color="blue"
            className="border border-sky-500"
            onChange={(value) => setTabType(value as TabType)}
            data={[
              { label: "１通目", value: TabType.First },
              { label: "返信", value: TabType.Reply },
            ]}
          />
        </div>
        {pages}
      </section>
    </article>
  );
}
