"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

import { NavigationMenuItem } from "@/components/ui";
import { Routes } from "@/config";

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

const menuItems = [
  {
    href: Routes.login,
    word: "はろーわーるど",
  },
  {
    href: Routes.newPost,
    word: "手紙を綴る",
  },
  {
    href: Routes.posts,
    word: "届いた手紙",
  },
  {
    href: Routes.user("1"),
    word: "綴った手紙",
  },
  {
    href: Routes.logout,
    word: "しーゆーわーるど",
  },
];

export const NavigationMenu = ({
  isVisible,
  handleToggle,
}: {
  isVisible: boolean;
  handleToggle: () => void;
}) => {
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

  return (
    <motion.div
      id="menuDiv"
      variants={divVariants}
      className="fixed left-0 top-0 flex h-full w-full cursor-default flex-col items-center justify-center"
    >
      <motion.ul
        variants={variants}
        className={`absolute flex w-full flex-col items-center justify-center bg-slate-200 py-4 ${isVisible ? "" : "hidden md:block"}`}
      >
        {menuItems.map((item, i) => (
          <NavigationMenuItem
            key={i}
            href={item.href}
            word={item.word}
            handleToggle={handleToggle}
          />
        ))}
      </motion.ul>
    </motion.div>
  );
};
