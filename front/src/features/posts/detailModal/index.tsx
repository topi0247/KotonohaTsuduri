import { Modal } from "@mantine/core";
import Link from "next/link";
import { memo } from "react";
import useSWR from "swr";

import { Routes } from "@/config";
import { axiosClient } from "@/lib";

const fetcher = (url: string) =>
  axiosClient()
    .get(url)
    .then((res) => res.data);

export const DetailModal = memo(function DetailModal({
  opened,
  onClose,
  uuid,
  lettersCount,
  isReadLetter,
}: {
  opened: boolean;
  onClose: () => void;
  uuid: string;
  lettersCount: number;
  isReadLetter?: boolean;
}) {
  const { data: Tags } = useSWR(uuid ? `/posts/${uuid}/tags` : null, fetcher);
  const { data: Genres } = useSWR(uuid ? `/posts/${uuid}/genres` : null, fetcher);

  return (
    <Modal opened={opened} onClose={onClose} title="どんな手紙？">
      <div className="relative bg-white px-2">
        <h3 className="my-2 text-lg">
          <span className="border-b border-sky-600 pr-2">ジャンル</span>
        </h3>
        <ul className="pb-2">
          {Genres === undefined ? (
            <li>ちょっとまってね</li>
          ) : Genres?.length === 0 ? (
            <li>ないみたい</li>
          ) : (
            Genres?.map((genre: string) => <li key={genre}>{genre}</li>)
          )}
        </ul>
        <div className="mb-4 w-1/2 border-b border-dashed border-sky-200 pt-4"></div>
        <h3 className="my-2 text-lg">
          <span className="border-b border-sky-600 pr-2">タグ</span>
        </h3>
        <ul>
          {Tags === undefined ? (
            <li>ちょっとまってね</li>
          ) : Tags?.length === 0 ? (
            <li>ないみたい</li>
          ) : (
            Tags.map((tag: string) => <li key={tag}>{tag}</li>)
          )}
        </ul>
        <div className="absolute bottom-0 right-0 flex flex-col items-end justify-center gap-3">
          <div className="opacity-50">
            <div className="postmark">
              {lettersCount}
              <span className="text-sm">通</span>
            </div>
          </div>
          {isReadLetter && (
            <div className="text-end">
              <Link href={Routes.post(uuid)} className="stripe-pattern-orange px-2 text-slate-700">
                手紙を読む
              </Link>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
});
