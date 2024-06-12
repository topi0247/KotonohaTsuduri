export default function ValidError({ errorMsg }: { errorMsg: React.ReactNode[] }) {
  return (
    <div className="text-sm text-red-400">
      {errorMsg.map((msg: React.ReactNode, index: number) => msg && <div key={index}>{msg}</div>)}
    </div>
  );
}
