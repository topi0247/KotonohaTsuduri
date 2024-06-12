"use client";

export default function Textarea({
  onChange,
  value,
}: {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}) {
  const MAX_LENGTH = 100000;
  const letterLength = value.length;
  const isLetterLengthValid = letterLength <= MAX_LENGTH;

  const resizeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <>
      <textarea
        className={`lined-textarea h-full w-full resize-none px-2 text-base focus:outline-none ${isLetterLengthValid ? "" : "text-red-400"}`}
        placeholder="拝啓..."
        value={value}
        onChange={(e) => {
          resizeTextArea(e);
          onChange(e);
        }}
      />
      <small
        className={`block text-end text-sm text-gray-500 ${isLetterLengthValid ? "" : "text-red-400"}`}
      >
        {letterLength}/100000文字
      </small>
    </>
  );
}
