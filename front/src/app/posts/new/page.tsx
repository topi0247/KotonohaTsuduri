"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import * as UI from "@/components/ui";
import { Routes } from "@/config";
import { PostForm } from "@/features/posts";
import { useNotification } from "@/hooks";
import { NotificationType } from "@/types";

export default function PostNew() {
  const [isPost, setIsPost] = useState(false);
  const [isPostAnimationComplete, setIsPostAnimationComplete] = useState(false);
  const [name, setName] = useState("");
  const { setNewNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (isPost && isPostAnimationComplete) {
      setNewNotification({
        title: "せいこう！",
        message: "手紙を投函しました",
        type: NotificationType.SUCCESS,
      });
      router.push(Routes.posts);
    }
  }, [isPost, isPostAnimationComplete]);

  const onAnimationComplete = () => {
    setIsPostAnimationComplete(true);
  };

  const togglePost = () => {
    setIsPost(!isPost);
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 1 }}
        animate={isPost ? { opacity: 0 } : { opacity: 1 }}
        className={`m-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-4 ${isPostAnimationComplete ? "hidden" : ""}`}
      >
        <h1 className="text-center text-xl">手紙を書いてみよう</h1>
        <section className="w-full">
          <div className="flex w-full overflow-hidden bg-white p-4">
            <PostForm postURl="/posts/none/letter" togglePost={togglePost} setSetName={setName} />
          </div>
        </section>
      </motion.article>
      <UI.PostDirection name={name} isPost={isPost} onAnimationComplete={onAnimationComplete} />
    </>
  );
}
