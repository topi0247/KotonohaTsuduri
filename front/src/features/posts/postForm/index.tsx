"use client";

import { useForm } from "@mantine/form";

import * as Form from "@/components/forms";
import { useNotification } from "@/hooks";
import { axiosClient } from "@/lib";
import { NotificationType } from "@/types";

const Genres = ["SF", "ファンタジー", "恋愛", "ホラー", "ミステリー", "サスペンス", "ポエム"];

const Tags = ["涙腺崩壊", "意味怖", "ほのぼの", "切ない", "ハッピー", "感動", "笑い", "おもしろ"];

export default function PostForm({
  postURl,
  togglePost,
  setSetName,
}: {
  postURl: string;
  togglePost: () => void;
  setSetName: (name: string) => void;
}) {
  const { setNewNotification } = useNotification();
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
      const res = await axiosClient().post(postURl, letter);
      if (res.status != 201) {
        throw new Error(res.data.message);
      }
      setSetName(name);
      togglePost();
    } catch (error) {
      setNewNotification({
        title: "しっぱい...",
        message: "手紙の投函に失敗しました",
        type: NotificationType.ERROR,
      });
    }
  };

  return (
    <>
      <form
        className="flex w-full flex-col items-center justify-center"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <div className="mb-8 mt-4 w-full">
          <Form.Textarea
            onChange={form.getInputProps("letter").onChange}
            value={form.getValues().letter}
            placeholder="拝啓..."
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
        <div className="my-2 w-full">
          <Form.TagsInput
            label="タグ"
            placeholder="涙腺崩壊、意味怖、ほのぼの、切ない、ハッピー"
            data={Tags}
            props={form.getInputProps("tags")}
          />
        </div>
        <div className="w-full text-center">
          <Form.ValidError errorMsg={[form.errors.name, form.errors.letter]} />
          <Form.Button labelName="投函" />
        </div>
      </form>
    </>
  );
}
