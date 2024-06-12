export default function Input({
  onChange,
  value,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  const nameLength = value.length;
  const isNameLengthValid = nameLength <= 10;
  return (
    <div className="relative flex w-full items-center justify-start">
      <input
        id="name"
        placeholder="名もなき人"
        name="name"
        className={`w-2/3 max-w-[16rem] focus:outline-none ${isNameLengthValid ? "" : "text-red-400"}`}
        onChange={onChange}
      />
      <div className="flex items-center justify-center">
        <label htmlFor="name" className="shrink">
          より
        </label>
        <p className={`shrink text-sm text-gray-500 ${isNameLengthValid ? "" : "text-red-400"}`}>
          {nameLength}/10文字
        </p>
      </div>
    </div>
  );
}
