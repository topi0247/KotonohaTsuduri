import { axiosClient } from "@/lib";
import { IUser } from "@/types";

export const getUser = async () => {
  try {
    const res = await axiosClient().get("/auth/validate_token");
    if (res.status !== 200 || !res.data) {
      return null;
    }

    const user: IUser = (res.data as { user: IUser }).user;
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
