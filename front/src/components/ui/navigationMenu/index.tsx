"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { NavigationMenuItem } from "@/components/ui";
import { Routes } from "@/config";
import { userState } from "@/hooks";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const divVariants = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

const menuItems = {
  login: {
    href: Routes.login,
    word: "はろーわーるど",
  },
  newPost: {
    href: Routes.newPost,
    word: "手紙を綴る",
  },
  posts: {
    href: Routes.posts,
    word: "みんなの手紙",
  },
  user: (uuid: string) => ({
    href: Routes.user(uuid),
    word: "綴った手紙",
  }),
  logout: {
    href: Routes.logout,
    word: "しーゆーわーるど",
  },
};

export const NavigationMenu = ({
  isVisible,
  handleToggle,
}: {
  isVisible: boolean;
  handleToggle: () => void;
}) => {
  const user = useRecoilValue(userState);

  useEffect(() => {
    const menudiv = document.getElementById("menuDiv");
    if (!menudiv) return;

    function handleClick(e: Event) {
      if (e.target === menudiv) {
        handleToggle();
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const isLogged = () => {
    return user.uuid !== "";
  };

  return (
    <motion.div
      id="menuDiv"
      variants={divVariants}
      className={`fixed left-0 top-0 flex h-full w-full cursor-default flex-col items-center justify-center bg-black bg-opacity-50 ${isVisible ? "" : "hidden"}`}
    >
      <motion.ul
        variants={variants}
        className={`absolute flex w-full flex-col items-center justify-center bg-slate-200 py-4 ${isVisible ? "" : "hidden md:block"}`}
      >
        {/* ログインとアプリ紹介 */}
        <NavigationMenuItem
          href={menuItems.login.href}
          word={menuItems.login.word}
          handleToggle={handleToggle}
        />

        {/* 投稿一覧 */}
        <NavigationMenuItem
          href={menuItems.posts.href}
          word={menuItems.posts.word}
          handleToggle={handleToggle}
        />

        {/* 新規投稿 */}
        {isLogged() && (
          <NavigationMenuItem
            href={menuItems.newPost.href}
            word={menuItems.newPost.word}
            handleToggle={handleToggle}
          />
        )}

        {isLogged() && (
          <>
            {/* マイページ */}
            <NavigationMenuItem
              href={menuItems.user("1").href}
              word={menuItems.user("1").word}
              handleToggle={handleToggle}
            />

            {/* ログアウト */}
            <NavigationMenuItem
              href={menuItems.logout.href}
              word={menuItems.logout.word}
              handleToggle={handleToggle}
            />
          </>
        )}
      </motion.ul>
    </motion.div>
  );
};
