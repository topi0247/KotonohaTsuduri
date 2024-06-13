"use client";

import { useForm } from "@mantine/form";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import * as Form from "@/components/forms";
import * as UI from "@/components/ui";
import { Routes } from "@/config";
import { NewLetter } from "@/features/posts";
import { useNotification } from "@/hooks";
import { NotificationType } from "@/types";

const Genres = ["SF", "ファンタジー", "恋愛", "ホラー", "ミステリー", "サスペンス", "ポエム"];

const Tags = ["涙腺崩壊", "意味怖", "ほのぼの", "切ない", "ハッピー", "感動", "笑い", "おもしろ"];

export default function PostNew() {
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
        message: "手紙を投函しました",
        type: NotificationType.SUCCESS,
      });
      router.push(Routes.home);
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
      const res = await NewLetter(letter);
      if (res.status || res.data.success !== true) {
        throw new Error(res.data.message);
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
        className={`m-auto flex w-full max-w-[800px] flex-col items-center justify-center gap-4 ${isPostAnimationComplete ? "hidden" : ""}`}
      >
        <h1 className="text-center text-xl">手紙を書いてみよう</h1>
        <section className="w-full">
          <div className="flex w-full overflow-hidden bg-white p-4">
            <form
              className="flex w-full flex-col items-center justify-center"
              onSubmit={form.onSubmit(handleSubmit)}
            >
              <div className="mb-8 mt-4 w-full">
                <Form.Textarea
                  onChange={form.getInputProps("letter").onChange}
                  value={form.getValues().letter}
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
          </div>
        </section>
      </motion.article>
      <UI.PostDirection
        name={form.getValues().name}
        isPost={isPost}
        onAnimationComplete={onAnimationComplete}
      />
    </>
  );
}
