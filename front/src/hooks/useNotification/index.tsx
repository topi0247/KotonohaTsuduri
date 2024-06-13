"use client";

import { atom, useRecoilState } from "recoil";

import * as Type from "@/types";

export default function useNotification() {
  const [notification, setNotification] = useRecoilState<Type.INotification>(notificationState);

  const setNewNotification = ({
    title,
    message,
    type,
  }: {
    title?: string;
    message: string;
    type: Type.NotificationType;
  }) => {
    setNotification({ title, message, type, open: true });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return { setNewNotification, closeNotification, notification };
}

export const notificationState = atom<Type.INotification>({
  key: "notificationState",
  default: {
    title: "",
    message: "",
    type: Type.NotificationType.INFO,
    open: false,
  },
});
