"use client";

import { Drawer, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";

import * as UI from "@/components/ui";
import { Routes } from "@/config";
import { DetailModal, LetterDetail, PostForm } from "@/features/posts";
import { useNotification } from "@/hooks";
import { NotificationType } from "@/types";

export default function Reply({ params }: { params: { id: string } }) {
  const { id } = params;
  const [opened, { open, close }] = useDisclosure(false);
  const [openedLetter, { open: openLetter, close: closeLetter }] = useDisclosure(false);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(pageCount);
  const [name, setName] = useState("");
  const { mutate } = useSWRConfig();

  const onChange = (value: number) => {
    setPage(value);
  };

  const [isPost, setIsPost] = useState(false);
  const [isPostAnimationComplete, setIsPostAnimationComplete] = useState(false);
  const { setNewNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (isPost && isPostAnimationComplete) {
      setNewNotification({
        title: "せいこう！",
        message: "手紙を返信しました",
        type: NotificationType.SUCCESS,
      });
      mutate(`/posts/${id}`);
      router.push(Routes.posts);
    }
  }, [isPost, isPostAnimationComplete]);

  const togglePost = () => {
    setIsPost(!isPost);
  };

  const onAnimationComplete = () => {
    setIsPostAnimationComplete(true);
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 1 }}
        animate={isPost ? { opacity: 0 } : { opacity: 1 }}
        className={`letter-detail container m-auto flex flex-col items-center justify-center ${isPostAnimationComplete ? "hidden" : ""}`}
      >
        <div className="w-full max-w-[800px] flex-grow">
          <h1 className="text-center text-xl">手紙の続きの物語</h1>
          <section className="py-2">
            <button type="button" onClick={open} className="stripe-pattern-sky">
              どんな手紙？
            </button>
          </section>
          <section className="bg-white p-4">
            <PostForm postURl={`posts/${id}/letter`} togglePost={togglePost} setSetName={setName} />
          </section>
          <section className="mb-4 mt-2">
            <div className="m-auto flex w-full items-center justify-between gap-4 px-4">
              <Link href={Routes.posts} className="rounded bg-slate-500 px-2 py-1 text-white">
                一覧に戻る
              </Link>{" "}
              <button
                type="button"
                onClick={openLetter}
                className="rounded bg-orange-400 px-2 py-1 text-white"
              >
                履歴を見る
              </button>
            </div>
          </section>
        </div>
      </motion.article>
      <Drawer opened={openedLetter} onClose={closeLetter} position="bottom" size="md">
        <div className="m-auto w-full max-w-[800px] border">
          <LetterDetail page={page} uuid={id} setPageCount={setPageCount} />
        </div>
        <div style={{ display: "none" }}>
          <LetterDetail
            page={page - 1 > 0 ? page - 1 : page}
            uuid={id}
            setPageCount={setPageCount}
          />
        </div>
        <div className="pagination fixed bottom-0 left-0 m-auto flex w-full items-center justify-center">
          <div className="rounded bg-sky-200 bg-opacity-50 p-4">
            <Pagination
              withEdges
              total={pageCount}
              siblings={1}
              defaultValue={pageCount}
              value={page}
              onChange={onChange}
            />
          </div>
        </div>
      </Drawer>
      <DetailModal opened={opened} onClose={close} uuid={id} lettersCount={pageCount} />
      <UI.PostDirection name={name} isPost={isPost} onAnimationComplete={onAnimationComplete} />
    </>
  );
}
