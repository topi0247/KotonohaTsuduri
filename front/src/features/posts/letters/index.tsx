import { memo } from "react";
import useSWR from "swr";

import { axiosClient } from "@/lib";
import { ILetter } from "@/types";

import { Letter } from "../letter";

const fetcher = (url: string) =>
  axiosClient()
    .get(url)
    .then((res) => res.data);

export const Letters = memo(function Letters({
  url,
  onClick,
  setPostsCount,
}: {
  url: string;
  onClick: (uuid: string, lettersCount: number) => void;
  setPostsCount: (allPostsCount: number) => void;
}) {
  const { data } = useSWR(url, fetcher);

  if (!data) {
    return;
  }

  setPostsCount(data.all_count);

  return data.posts.map((letter: ILetter) => (
    <Letter key={letter.uuid} letter={letter} onClick={onClick} />
  ));
});
