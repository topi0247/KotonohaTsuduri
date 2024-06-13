import { axiosClient } from "@/lib";

export default async function NewLetter(value: {
  letter: {
    name: string;
    sentences: string;
    genres: string[];
    tags: string[];
  };
}) {
  try {
    const res = await axiosClient().post("/posts/none/letter", value);
    if (res.status !== 200 || !res.data) {
      return { status: false, data: res.data };
    }
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false };
  }
}
