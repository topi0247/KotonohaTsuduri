"use client";

import { Button, SegmentedControl } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR, { mutate } from "swr";

import { ValidError } from "@/components/forms";
import { DetailModal, Letters } from "@/features/posts";
import { useNotification, userState } from "@/hooks";
import { axiosClient } from "@/lib";
import { NotificationType } from "@/types";

const fetcher = (url: string) =>
  axiosClient()
    .get(url)
    .then((res) => res.data);

enum TabType {
  First = "first",
  Reply = "reply",
}

export default function User({ params: { id } }: { params: { id: string } }) {
  const { data } = useSWR(`/users/${id}/show_user`, fetcher);
  const user = useRecoilValue(userState);
  const [tabType, setTabType] = useState<TabType>(TabType.First);
  const currentPostAllCount = useRef(1);
  const currentUuid = useRef<string>("");
  const [cnt, setCnt] = useState(1);
  const [editName, setEditName] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { setNewNotification } = useNotification();
  const PER_PAGE = 12;
  const NAME_MAX_LENGTH = 10;

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => {
        if (value.length > NAME_MAX_LENGTH) {
          return "名前は10文字以内がいいな";
        }
      },
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
      const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
      const allPage = Math.ceil(currentPostAllCount.current / PER_PAGE);
      if (isScrolledToBottom && cnt + 1 <= allPage) {
        setCnt((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!data) {
    return <div>ちょっとまってね</div>;
  }

  const setPostsCount = (allPostsCount: number) => {
    currentPostAllCount.current = allPostsCount;
  };

  const handleClick = (uuid: string, lettersCount: number) => {
    open();
    currentUuid.current = uuid;
    currentPostAllCount.current = lettersCount;
  };

  const pages = [];
  for (let i = 1; i <= cnt; i++) {
    pages.push(
      <Letters
        key={i}
        url={`/users/${id}?tab=${tabType}&page=${i}`}
        onClick={handleClick}
        setPostsCount={setPostsCount}
      />,
    );
  }

  const toggleEditName = () => {
    setEditName(!editName);
  };

  const handleSubmit = async () => {
    const { name } = form.getValues();

    try {
      const res = await axiosClient().patch(`/users/${id}`, { name });
      if (res.status !== 200) {
        throw new Error(res.data.message);
      }
      mutate(`/users/${id}/show_user`);
      setEditName(false);
      setNewNotification({
        title: "せいこう！",
        message: "名前を更新したよ",
        type: NotificationType.SUCCESS,
      });
    } catch (error) {
      setNewNotification({
        title: "しっぱい...",
        message: "名前を更新できなかったよ",
        type: NotificationType.ERROR,
      });
    }
  };

  const isNameLengthValid = form.getValues().name.length <= NAME_MAX_LENGTH;

  return (
    <>
      <article className="relative h-full">
        <section className="flex flex-col items-center justify-between gap-2">
          {editName ? (
            <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col">
              <input
                id="name"
                placeholder="名もなき人"
                name="name"
                className={`max-w-[16rem] focus:outline-none ${isNameLengthValid ? "" : "text-red-400"}`}
                onChange={form.getInputProps("name").onChange}
              />
              <p
                className={`shrink text-end text-sm text-gray-500 ${isNameLengthValid ? "" : "text-red-400"}`}
              >
                {form.getValues().name.length}/{NAME_MAX_LENGTH}文字
              </p>
              <ValidError errorMsg={[form.errors.name]} />
              <div className="flex items-center justify-between">
                <Button type="submit" variant="filled" size="xs" className="w-16">
                  更新
                </Button>
                <Button
                  variant="filled"
                  size="xs"
                  className="w-16"
                  type="button"
                  onClick={() => toggleEditName()}
                >
                  戻す
                </Button>
              </div>
            </form>
          ) : (
            <h1>{data} さんの世界</h1>
          )}
          {user.uuid === id && !editName && (
            <Button variant="filled" size="xs" onClick={() => toggleEditName()}>
              名前を変える
            </Button>
          )}
        </section>
        <section className="relative">
          <div className="sticky top-0 z-10 my-4 text-center">
            <SegmentedControl
              value={tabType}
              color="blue"
              className="border border-sky-500"
              onChange={(value) => setTabType(value as TabType)}
              data={[
                { label: "１通目", value: TabType.First },
                { label: "返信", value: TabType.Reply },
              ]}
            />
          </div>
          <div className="my-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {pages}
          </div>
        </section>
      </article>
      <DetailModal
        opened={opened}
        onClose={close}
        uuid={currentUuid.current}
        lettersCount={currentPostAllCount.current}
        isReadLetter={true}
      />
    </>
  );
}
