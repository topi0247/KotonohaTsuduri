export default function Button({
  labelName,
  className,
  onClick,
}: {
  labelName: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-block rounded bg-sky-400 px-3 py-1 text-white ${className}`}
    >
      {labelName}
    </button>
  );
}
