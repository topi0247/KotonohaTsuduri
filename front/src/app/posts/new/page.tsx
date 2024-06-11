"use client";

import * as Mantine from "@mantine/core";
import { useState } from "react";

const Genres = ["SF", "ファンタジー", "恋愛", "ホラー", "ミステリー", "サスペンス", "ポエム"];

const Tags = ["涙腺崩壊", "意味怖", "ほのぼの", "切ない", "ハッピー", "感動", "笑い", "おもしろ"];

export default function PostNew() {
  const [nameLengh, setNameLength] = useState(0);
  const [letterLength, setLetterLength] = useState(0);
  const isNameLengthValid = nameLengh <= 10;
  const isLetterLengthValid = letterLength <= 100000;

  const resizeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLetterLength(e.target.value.length);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <article className="flex w-full flex-col items-center justify-center gap-4">
      <h1 className="text-center text-xl">手紙を書いてみよう</h1>
      <section className="w-full">
        <div className="flex w-full overflow-hidden bg-white p-4">
          <form className="flex w-full flex-col items-center justify-center">
            <div className="m-0 flex w-full flex-col items-end justify-center border-b border-sky-200">
              <div className="flex">
                <input
                  placeholder="◯◯"
                  className={`w-full text-end focus:outline-none ${isNameLengthValid ? "" : "text-red-400"}`}
                  onChange={(e) => setNameLength(e.target.value.length)}
                />
                へ
              </div>
              <small className={`text-sm text-gray-500 ${isNameLengthValid ? "" : "text-red-400"}`}>
                {nameLengh}/10文字
              </small>
            </div>
            <div className="mb-8 mt-4 w-full">
              <textarea
                className="lined-textarea h-full w-full resize-none px-2 text-base focus:outline-none"
                placeholder="拝啓..."
                onChange={(e) => {
                  resizeTextArea(e);
                }}
              />
              <small
                className={`block text-end text-sm text-gray-500 ${isLetterLengthValid ? "" : "text-red-400"}`}
              >
                {letterLength}/100000文字
              </small>
            </div>
            <Mantine.TagsInput
              label="ジャンル"
              placeholder="SF、ファンタジー、恋愛、ホラー、ミステリー"
              width="100%"
              splitChars={["、", ","]}
              variant="unstyled"
              className="w-full border-t border-dashed border-sky-200 py-2"
              data={Genres}
            />
            <Mantine.TagsInput
              label="タグ"
              placeholder="涙腺崩壊、意味怖、ほのぼの、切ない、ハッピー"
              width="100%"
              splitChars={["、", ","]}
              variant="unstyled"
              className="w-full border-t border-dashed border-sky-200 py-2"
              data={Tags}
            />
            <div className="w-full border-t border-dashed border-sky-200 py-2 text-center">
              <button className="inline-block rounded bg-sky-400 px-3 py-1 text-white">投函</button>
            </div>
          </form>
        </div>
      </section>
    </article>
  );
}
