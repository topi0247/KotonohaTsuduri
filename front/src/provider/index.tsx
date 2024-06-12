"use client";

import { MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <MantineProvider>{children}</MantineProvider>
    </RecoilRoot>
  );
};
