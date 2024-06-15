"use client";

import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { DetailModal, Letters } from "@/features/posts";
import { useAuth, userState } from "@/hooks";

export default function Posts() {
  const [opened, { open, close }] = useDisclosure(false);
  const [cnt, setCnt] = useState(1);
  const currentUuid = useRef<string>("");
  const currentLettersCount = useRef<number>(1);
  const allPostsCountRef = useRef(1);
  const { autoLogin } = useAuth();
  const [user, setUser] = useRecoilState(userState);
  const PER_PAGE = 12;

  const setPostsCount = (allPostsCount: number) => {
    allPostsCountRef.current = allPostsCount;
  };

  const handleClick = (uuid: string, lettersCount: number) => {
    open();
    currentUuid.current = uuid;
    currentLettersCount.current = lettersCount;
  };

  const pages = [];
  for (let i = 1; i <= cnt; i++) {
    pages.push(<Letters key={i} index={i} onClick={handleClick} setPostsCount={setPostsCount} />);
  }

  const fetchUserData = useCallback(async () => {
    await autoLogin();
    setUser((prev) => ({ ...prev, isLogged: true }));
  }, []);

  useEffect(() => {
    if (user.isLogged) {
      fetchUserData();
    }

    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
      const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
      const allPage = Math.ceil(allPostsCountRef.current / PER_PAGE);
      if (isScrolledToBottom && cnt + 1 <= allPage) {
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
        uuid={currentUuid.current}
        lettersCount={currentLettersCount.current}
        isReadLetter={true}
      />
    </>
  );
}
