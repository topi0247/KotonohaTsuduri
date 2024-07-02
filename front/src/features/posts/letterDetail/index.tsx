import { memo, useEffect } from "react";
import useSWR from "swr";

import { axiosClient } from "@/lib";

const fetcher = (url: string) =>
  axiosClient()
    .get(url)
    .then((res) => res.data);

export const LetterDetail = memo(function LetterDetail({
  page,
  uuid,
  setPageCount,
}: {
  page: number;
  uuid: string;
  setPageCount: (value: number) => void;
}) {
  const { data } = useSWR(`/posts/${uuid}?page=${page}`, fetcher);

  useEffect(() => {
    if (data !== undefined) {
      setPageCount(data.all_count);
    }
  }, [data]);

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
          <p className="border-b border-sky-200 text-end text-sm text-slate-400">
            {data.letter.created_at}
          </p>
          <p className="lined-textarea h-full w-full whitespace-pre-wrap px-2">
            {data.letter.sentences}
          </p>
        </section>
      )}
    </>
  );
});
