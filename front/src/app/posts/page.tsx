"use client";

import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";

import { Routes } from "@/config";
import { DetailModal } from "@/features/posts";
import { useAuth, userState } from "@/hooks";
import { axiosClient } from "@/lib";

export default function Posts() {
  const [opened, { open, close }] = useDisclosure(false);
  const [cnt, setCnt] = useState(1);
  const [currentUuid, setCurrentUuid] = useState<string>("");
  const [currentLettersCount, setCurrentLettersCount] = useState<number>(0);
  const { autoLogin } = useAuth();
  const [user, setUser] = useRecoilState(userState);

  const handleClick = (uuid: string, lettersCount: number) => {
    open();
    setCurrentUuid(uuid);
    setCurrentLettersCount(lettersCount);
  };

  const pages = [];
  for (let i = 1; i <= cnt; i++) {
    pages.push(<Letters key={i} index={i} onClick={handleClick} />);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      await autoLogin();
      setUser((prev) => ({ ...prev, isLogged: true }));
    };

    if (!user.isLogged) {
      fetchUserData();
    }

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
      <DetailModal
        opened={opened}
        onClose={close}
        uuid={currentUuid}
        lettersCount={currentLettersCount}
        isReadLetter={true}
      />
    </>
  );
}

const fetcher = (url: string) =>
  axiosClient()
    .get(url)
    .then((res) => res.data);

function Letters({
  index,
  onClick,
}: {
  index: number;
  onClick: (uuid: string, lettersCount: number) => void;
}) {
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
              onClick={() => onClick(uuid, letters.count)}
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
