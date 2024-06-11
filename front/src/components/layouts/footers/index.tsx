import Link from "next/link";

export default function Footers() {
  return (
    <div className="flex flex-col items-center justify-between gap-2 bg-slate-100 py-2">
      <h5>言の葉つづり</h5>
      <ul className="flex gap-2 text-sm">
        <li>
          <Link href="#" className="text-sky-300">
            利用規約
          </Link>
        </li>
        <li>
          <Link href="#" className="text-sky-300">
            プライバシーポリシー
          </Link>
        </li>
      </ul>
      <small>©2024 言の葉つづり</small>
    </div>
  );
}
