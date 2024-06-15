import Link from "next/link";
import { memo } from "react";

import { Routes } from "@/config";
import { ILetter } from "@/types";

export const Letter = memo(function Letter({
  letter,
  onClick,
}: {
  letter: ILetter;
  onClick: (uuid: string, lettersCount: number) => void;
}) {
  return (
    <section className="envelope-container group" key={letter.uuid}>
      <div className="envelope envelope1 relative">
        <div className="card absolute overflow-hidden">
          <div className="absolute top-0 z-20 whitespace-pre-wrap p-4 text-sm">
            {letter.letters.sentences}
          </div>
        </div>
        <div className="tape-container">
          <button
            type="button"
            className="stripe-pattern-sky px-2 text-slate-700"
            onClick={() => onClick(letter.uuid, letter.letters.count)}
          >
            どんな手紙？
          </button>
          <Link
            href={Routes.post(letter.uuid)}
            className="stripe-pattern-orange px-2 text-slate-700"
          >
            手紙を読む
          </Link>
        </div>
        <div className="postmark-container">
          <div className="postmark">
            {letter.letters.count}
            <span className="text-sm">通</span>
          </div>
        </div>
        <div className="name-container">
          <p className="w-full">{letter.letters.name} より</p>
        </div>
      </div>
      {letter.letters.count > 1 && (
        <div className="envelope envelope2 relative">
          <div className="card absolute"></div>
        </div>
      )}
      {letter.letters.count > 2 && (
        <div className="envelope envelope3 relative">
          <div className="card absolute"></div>
        </div>
      )}
      {letter.letters.count > 3 && (
        <div className="envelope envelope4 relative">
          <div className="card absolute"></div>
        </div>
      )}
      {letter.letters.count > 4 && (
        <div className="envelope envelope5 relative">
          <div className="card absolute"></div>
        </div>
      )}
    </section>
  );
});
