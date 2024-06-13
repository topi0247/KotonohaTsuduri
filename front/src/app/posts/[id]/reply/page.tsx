"use client";

import { Drawer, Pagination } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

import * as Form from "@/components/forms";
import * as UI from "@/components/ui";
import { Routes } from "@/config";
import { DetailModal } from "@/features/posts";
import { ReplyLetter } from "@/features/posts";
import { useNotification } from "@/hooks";
import { axiosClient } from "@/lib";
import { NotificationType } from "@/types";

const fetcher = (url: string) =>
  axiosClient()
    .get(url)
    .then((res) => res.data);

const Genres = ["SF", "ファンタジー", "恋愛", "ホラー", "ミステリー", "サスペンス", "ポエム"];

const Tags = ["涙腺崩壊", "意味怖", "ほのぼの", "切ない", "ハッピー", "感動", "笑い", "おもしろ"];

export default function Reply({ params }: { params: { id: string } }) {
  const { id } = params;
  const [opened, { open, close }] = useDisclosure(false);
  const [openedLetter, { open: openLetter, close: closeLetter }] = useDisclosure(false);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(pageCount);

  const onChange = (value: number) => {
    setPage(value);
  };

  // TODO : リファクタリング
  const [isPost, setIsPost] = useState(false);
  const [isPostAnimationComplete, setIsPostAnimationComplete] = useState(false);
  const [isPostComplete, setIsPostComplete] = useState(false);
  const { setNewNotification } = useNotification();
  const router = useRouter();
  const MAX_NAME_LENGTH = 10;
  const MAX_SENTENCE_LENGTH = 100000;
  const form = useForm({
    initialValues: {
      name: "",
      letter: "",
      genres: [],
      tags: [],
    },
    validate: {
      name: (value: string) => {
        if (value.length > MAX_NAME_LENGTH) {
          return `名前は${MAX_NAME_LENGTH}文字以内がいいな`;
        }
      },
      letter: (value: string) => {
        if (value.length > MAX_SENTENCE_LENGTH) {
          return `${MAX_SENTENCE_LENGTH}文字まで書けるよ`;
        }
        if (value.length === 0) {
          return "まだ何も書かれていないよ";
        }
      },
    },
  });

  useEffect(() => {
    if (isPostComplete && isPostAnimationComplete) {
      setNewNotification({
        title: "せいこう！",
        message: "手紙を返信しました",
        type: NotificationType.SUCCESS,
      });
      router.push(Routes.post(id));
    }
  }, [isPostComplete, isPostAnimationComplete]);

  const togglePost = () => {
    setIsPost(!isPost);
  };

  const handleSubmit = async () => {
    const { name, letter: letterData, genres, tags } = form.getValues();

    const letter = {
      letter: {
        name,
        sentences: letterData,
        genres,
        tags,
      },
    };

    try {
      const res = await ReplyLetter(id, letter);
      if (!res.status) {
        throw new Error(res.data);
      }

      togglePost();
      setIsPostComplete(true);
    } catch (error) {
      console.error(error);
      setNewNotification({
        title: "しっぱい...",
        message: "手紙の投函に失敗しました",
        type: NotificationType.ERROR,
      });
    }
  };

  const onAnimationComplete = () => {
    if (!isPost) return;
    form.reset();
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
          <form
            className="my-4 flex w-full flex-col items-center justify-center bg-white p-4"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <div className="mb-8 mt-4 w-full">
              <Form.Textarea
                onChange={form.getInputProps("letter").onChange}
                value={form.getValues().letter}
                placeholder="拝復..."
              />
            </div>

            <div className="m-0 flex w-full flex-col items-end justify-center border-b border-sky-200">
              <Form.Input
                onChange={form.getInputProps("name").onChange}
                value={form.getValues().name}
              />
            </div>
            <div className="mt-2 w-full">
              <Form.TagsInput
                label="ジャンル"
                placeholder="SF、ファンタジー、恋愛、ホラー、ミステリー"
                data={Genres}
                props={form.getInputProps("genres")}
              />
            </div>
            <div className="mt-2 w-full">
              <Form.TagsInput
                label="タグ"
                placeholder="涙腺崩壊、意味怖、ほのぼの、切ない、ハッピー"
                data={Tags}
                props={form.getInputProps("tags")}
              />
            </div>
            <div className="mt-4 w-full text-center">
              <Form.ValidError errorMsg={[form.errors.name, form.errors.letter]} />
              <Form.Button labelName="投函" />
            </div>
          </form>
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
        {Letter({ open, page: page, uuid: id })}
        <div style={{ display: "none" }}>
          {Letter({ open, page: page - 1, uuid: id, setPageCount })}
        </div>
        <div className="pagination fixed bottom-0 left-0 m-auto flex w-full max-w-[500px] items-center justify-center rounded bg-sky-200 bg-opacity-50 p-4">
          <Pagination
            withEdges
            total={pageCount}
            siblings={1}
            defaultValue={1}
            value={page}
            onChange={onChange}
          />
        </div>
      </Drawer>
      <DetailModal opened={opened} onClose={close} uuid={id} lettersCount={pageCount} />
      <UI.PostDirection
        name={form.getValues().name}
        isPost={isPost}
        onAnimationComplete={onAnimationComplete}
      />
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
