"use client";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

export default function Posts() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <article className="container relative m-auto">
        <h1 className="text-center text-xl">みんなの手紙</h1>
        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {/* ここから手紙 */}
          <section className="envelope-container group">
            <div className="envelope envelope1 relative">
              <div className="card absolute overflow-hidden">
                <div className="absolute top-0 z-20 whitespace-pre-wrap p-4 text-sm">
                  ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
                </div>
              </div>
              <div className="absolute -left-[140px] top-[230px] z-10 flex w-[280px] flex-col items-start justify-center gap-3 text-sm">
                <button
                  type="button"
                  className="stripe-pattern-sky px-2 text-slate-700"
                  onClick={open}
                >
                  どんな手紙？
                </button>
                <Link href="" className="stripe-pattern-orange px-2 text-slate-700">
                  手紙を読む
                </Link>
              </div>
              <div className="absolute -right-[120px] top-[200px] z-10 flex flex-col items-start justify-center gap-3 text-sm">
                <div className="postmark">
                  1<span className="text-sm">通</span>
                </div>
              </div>
              <div className="absolute -right-[140px] top-[275px] z-10 flex w-[180px] flex-col items-start justify-center gap-3 text-end text-sm">
                <p className="w-full">ダミーユーザー より</p>
              </div>
            </div>
            <div className="envelope envelope2 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope3 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope4 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope5 relative">
              <div className="card absolute"></div>
            </div>
          </section>
          {/* ここまで手紙 */}
          <section className="envelope-container group">
            <div className="envelope envelope1 relative">
              <div className="card absolute overflow-hidden">
                <div className="absolute top-0 z-20 whitespace-pre-wrap p-4 text-sm">
                  ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
                </div>
              </div>
              <div className="absolute -left-[140px] top-[230px] z-10 flex w-[280px] flex-col items-start justify-center gap-3 text-sm">
                <button
                  type="button"
                  className="stripe-pattern-sky px-2 text-slate-700"
                  onClick={open}
                >
                  どんな手紙？
                </button>
                <Link href="" className="stripe-pattern-orange px-2 text-slate-700">
                  手紙を読む
                </Link>
              </div>
              <div className="absolute -right-[120px] top-[200px] z-10 flex flex-col items-start justify-center gap-3 text-sm">
                <div className="postmark">
                  1<span className="text-sm">通</span>
                </div>
              </div>
              <div className="absolute -right-[140px] top-[275px] z-10 flex w-[180px] flex-col items-start justify-center gap-3 text-end text-sm">
                <p className="w-full">ダミーユーザー より</p>
              </div>
            </div>
            <div className="envelope envelope2 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope3 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope4 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope5 relative">
              <div className="card absolute"></div>
            </div>
          </section>
          <section className="envelope-container group">
            <div className="envelope envelope1 relative">
              <div className="card absolute overflow-hidden">
                <div className="absolute top-0 z-20 whitespace-pre-wrap p-4 text-sm">
                  ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
                </div>
              </div>
              <div className="absolute -left-[140px] top-[230px] z-10 flex w-[280px] flex-col items-start justify-center gap-3 text-sm">
                <button
                  type="button"
                  className="stripe-pattern-sky px-2 text-slate-700"
                  onClick={open}
                >
                  どんな手紙？
                </button>
                <Link href="" className="stripe-pattern-orange px-2 text-slate-700">
                  手紙を読む
                </Link>
              </div>
              <div className="absolute -right-[120px] top-[200px] z-10 flex flex-col items-start justify-center gap-3 text-sm">
                <div className="postmark">
                  1<span className="text-sm">通</span>
                </div>
              </div>
              <div className="absolute -right-[140px] top-[275px] z-10 flex w-[180px] flex-col items-start justify-center gap-3 text-end text-sm">
                <p className="w-full">ダミーユーザー より</p>
              </div>
            </div>
            <div className="envelope envelope2 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope3 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope4 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope5 relative">
              <div className="card absolute"></div>
            </div>
          </section>
          <section className="envelope-container group">
            <div className="envelope envelope1 relative">
              <div className="card absolute overflow-hidden">
                <div className="absolute top-0 z-20 whitespace-pre-wrap p-4 text-sm">
                  ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
                </div>
              </div>
              <div className="absolute -left-[140px] top-[230px] z-10 flex w-[280px] flex-col items-start justify-center gap-3 text-sm">
                <button
                  type="button"
                  className="stripe-pattern-sky px-2 text-slate-700"
                  onClick={open}
                >
                  どんな手紙？
                </button>
                <Link href="" className="stripe-pattern-orange px-2 text-slate-700">
                  手紙を読む
                </Link>
              </div>
              <div className="absolute -right-[120px] top-[200px] z-10 flex flex-col items-start justify-center gap-3 text-sm">
                <div className="postmark">
                  1<span className="text-sm">通</span>
                </div>
              </div>
              <div className="absolute -right-[140px] top-[275px] z-10 flex w-[180px] flex-col items-start justify-center gap-3 text-end text-sm">
                <p className="w-full">ダミーユーザー より</p>
              </div>
            </div>
            <div className="envelope envelope2 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope3 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope4 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope5 relative">
              <div className="card absolute"></div>
            </div>
          </section>
          <section className="envelope-container group">
            <div className="envelope envelope1 relative">
              <div className="card absolute overflow-hidden">
                <div className="absolute top-0 z-20 whitespace-pre-wrap p-4 text-sm">
                  ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
                </div>
              </div>
              <div className="absolute -left-[140px] top-[230px] z-10 flex w-[280px] flex-col items-start justify-center gap-3 text-sm">
                <button
                  type="button"
                  className="stripe-pattern-sky px-2 text-slate-700"
                  onClick={open}
                >
                  どんな手紙？
                </button>
                <Link href="" className="stripe-pattern-orange px-2 text-slate-700">
                  手紙を読む
                </Link>
              </div>
              <div className="absolute -right-[120px] top-[200px] z-10 flex flex-col items-start justify-center gap-3 text-sm">
                <div className="postmark">
                  1<span className="text-sm">通</span>
                </div>
              </div>
              <div className="absolute -right-[140px] top-[275px] z-10 flex w-[180px] flex-col items-start justify-center gap-3 text-end text-sm">
                <p className="w-full">ダミーユーザー より</p>
              </div>
            </div>
            <div className="envelope envelope2 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope3 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope4 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope5 relative">
              <div className="card absolute"></div>
            </div>
          </section>
          <section className="envelope-container group">
            <div className="envelope envelope1 relative">
              <div className="card absolute overflow-hidden">
                <div className="absolute top-0 z-20 whitespace-pre-wrap p-4 text-sm">
                  ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
                </div>
              </div>
              <div className="absolute -left-[140px] top-[230px] z-10 flex w-[280px] flex-col items-start justify-center gap-3 text-sm">
                <button
                  type="button"
                  className="stripe-pattern-sky px-2 text-slate-700"
                  onClick={open}
                >
                  どんな手紙？
                </button>
                <Link href="" className="stripe-pattern-orange px-2 text-slate-700">
                  手紙を読む
                </Link>
              </div>
              <div className="absolute -right-[120px] top-[200px] z-10 flex flex-col items-start justify-center gap-3 text-sm">
                <div className="postmark">
                  1<span className="text-sm">通</span>
                </div>
              </div>
              <div className="absolute -right-[140px] top-[275px] z-10 flex w-[180px] flex-col items-start justify-center gap-3 text-end text-sm">
                <p className="w-full">ダミーユーザー より</p>
              </div>
            </div>
            <div className="envelope envelope2 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope3 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope4 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope5 relative">
              <div className="card absolute"></div>
            </div>
          </section>
          <section className="envelope-container group">
            <div className="envelope envelope1 relative">
              <div className="card absolute overflow-hidden">
                <div className="absolute top-0 z-20 whitespace-pre-wrap p-4 text-sm">
                  ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
                </div>
              </div>
              <div className="absolute -left-[140px] top-[230px] z-10 flex w-[280px] flex-col items-start justify-center gap-3 text-sm">
                <button
                  type="button"
                  className="stripe-pattern-sky px-2 text-slate-700"
                  onClick={open}
                >
                  どんな手紙？
                </button>
                <Link href="" className="stripe-pattern-orange px-2 text-slate-700">
                  手紙を読む
                </Link>
              </div>
              <div className="absolute -right-[120px] top-[200px] z-10 flex flex-col items-start justify-center gap-3 text-sm">
                <div className="postmark">
                  1<span className="text-sm">通</span>
                </div>
              </div>
              <div className="absolute -right-[140px] top-[275px] z-10 flex w-[180px] flex-col items-start justify-center gap-3 text-end text-sm">
                <p className="w-full">ダミーユーザー より</p>
              </div>
            </div>
            <div className="envelope envelope2 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope3 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope4 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope5 relative">
              <div className="card absolute"></div>
            </div>
          </section>
          <section className="envelope-container group">
            <div className="envelope envelope1 relative">
              <div className="card absolute overflow-hidden">
                <div className="absolute top-0 z-20 whitespace-pre-wrap p-4 text-sm">
                  ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
                </div>
              </div>
              <div className="absolute -left-[140px] top-[230px] z-10 flex w-[280px] flex-col items-start justify-center gap-3 text-sm">
                <button
                  type="button"
                  className="stripe-pattern-sky px-2 text-slate-700"
                  onClick={open}
                >
                  どんな手紙？
                </button>
                <Link href="" className="stripe-pattern-orange px-2 text-slate-700">
                  手紙を読む
                </Link>
              </div>
              <div className="absolute -right-[120px] top-[200px] z-10 flex flex-col items-start justify-center gap-3 text-sm">
                <div className="postmark">
                  1<span className="text-sm">通</span>
                </div>
              </div>
              <div className="absolute -right-[140px] top-[275px] z-10 flex w-[180px] flex-col items-start justify-center gap-3 text-end text-sm">
                <p className="w-full">ダミーユーザー より</p>
              </div>
            </div>
            <div className="envelope envelope2 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope3 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope4 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope5 relative">
              <div className="card absolute"></div>
            </div>
          </section>
          <section className="envelope-container group">
            <div className="envelope envelope1 relative">
              <div className="card absolute overflow-hidden">
                <div className="absolute top-0 z-20 whitespace-pre-wrap p-4 text-sm">
                  ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
                </div>
              </div>
              <div className="absolute -left-[140px] top-[230px] z-10 flex w-[280px] flex-col items-start justify-center gap-3 text-sm">
                <button
                  type="button"
                  className="stripe-pattern-sky px-2 text-slate-700"
                  onClick={open}
                >
                  どんな手紙？
                </button>
                <Link href="" className="stripe-pattern-orange px-2 text-slate-700">
                  手紙を読む
                </Link>
              </div>
              <div className="absolute -right-[120px] top-[200px] z-10 flex flex-col items-start justify-center gap-3 text-sm">
                <div className="postmark">
                  1<span className="text-sm">通</span>
                </div>
              </div>
              <div className="absolute -right-[140px] top-[275px] z-10 flex w-[180px] flex-col items-start justify-center gap-3 text-end text-sm">
                <p className="w-full">ダミーユーザー より</p>
              </div>
            </div>
            <div className="envelope envelope2 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope3 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope4 relative">
              <div className="card absolute"></div>
            </div>
            <div className="envelope envelope5 relative">
              <div className="card absolute"></div>
            </div>
          </section>
        </div>
      </article>
      <Modal opened={opened} onClose={close} title="どんな手紙？">
        <div className="relative mt-8 bg-white px-2">
          <h3>
            <span className="border-b border-sky-600 px-2">ジャンル</span>
          </h3>
          <ul className="border-b border-dashed border-sky-300 pb-2">
            <li>ダミーテキスト</li>
            <li>ダミーテキスト</li>
            <li>ダミーテキスト</li>
            <li>ダミーテキスト</li>
            <li>ダミーテキスト</li>
          </ul>
          <h3 className="pt-2">
            <span className="border-b border-sky-600 px-2">タグ</span>
          </h3>
          <ul>
            <li>ダミーテキスト</li>
            <li>ダミーテキスト</li>
            <li>ダミーテキスト</li>
            <li>あいうえお</li>
            <li>ダミーテキスト</li>
          </ul>
          <div className="absolute bottom-8 right-0 opacity-50">
            <div className="postmark">
              1<span className="text-sm">通</span>
            </div>
          </div>
          <div className="text-end">
            <Link href="" className="stripe-pattern-orange px-2 text-slate-700">
              手紙を読む
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
