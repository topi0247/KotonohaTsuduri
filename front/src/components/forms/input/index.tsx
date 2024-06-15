export default function Input({
  onChange,
  value,
  placeholder = "名もなき人",
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
}) {
  const MAX_LENGTH = 10;
  const nameLength = value.length;
  const isNameLengthValid = nameLength <= MAX_LENGTH;
  return (
    <div className="relative flex w-full items-center justify-start">
      <input
        id="name"
        placeholder={placeholder}
        name="name"
        className={`w-2/3 max-w-[16rem] focus:outline-none ${isNameLengthValid ? "" : "text-red-400"}`}
        onChange={onChange}
      />
      <div className="flex items-center justify-center">
        <label htmlFor="name" className="shrink">
          より
        </label>
        <p className={`shrink text-sm text-gray-500 ${isNameLengthValid ? "" : "text-red-400"}`}>
          {nameLength}/{MAX_LENGTH}文字
        </p>
      </div>
    </div>
  );
}
