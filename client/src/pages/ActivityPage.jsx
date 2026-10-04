export function ActivityPage({ posts }) {
  return (
    <>
      <section className="intro">
        <div>
          <p className="eyebrow">Rachunek osobisty</p>
          <h1>Historia operacji</h1>
          <p>Dyspozycje zapisane w aplikacji warsztatowej.</p>
        </div>
      </section>
      <section className="list">
        {posts.map((post) => (
          <article key={post.id}>
            <b>↗</b>
            <div>
              <h3>{post.title || "Dyspozycja bez tytułu"}</h3>
              <p>{post.body}</p>
              <small>
                {post.author} · {post.created_at}
              </small>
            </div>
            <span>Przyjęto</span>
          </article>
        ))}
      </section>
    </>
  );
}
