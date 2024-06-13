import { axiosClient } from "@/lib";

export default async function ReplyLetter(
  uuid: string,
  value: {
    letter: {
      name: string;
      sentences: string;
      genres: string[];
      tags: string[];
    };
  },
) {
  try {
    const res = await axiosClient().post(`/posts/${uuid}/letter`, value);

    return { status: res.status === 201, data: res.data.message };
  } catch (error) {
    return { status: false, error };
  }
}
