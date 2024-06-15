export default function User({ params: { id } }: { params: { id: string } }) {
  return (
    <article>
      <section>
        <h1>ユーザーページ</h1>
        <p>ユーザーID: {id}</p>
      </section>
    </article>
  );
}
