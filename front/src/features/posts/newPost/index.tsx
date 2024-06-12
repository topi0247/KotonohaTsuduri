import { axiosClient } from "@/lib";

export default async function NewPost(value: string) {
  try {
    const res = await axiosClient().post("/posts", { value });
    if (res.status !== 200 || !res.data) {
      return { status: false };
    }
    return { status: true, data: res.data };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
}
