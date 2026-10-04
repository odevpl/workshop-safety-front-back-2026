export function SecurityPage({ navigate }) {
  return (
    <>
      <section className="intro">
        <div>
          <p className="eyebrow">Ustawienia</p>
          <h1>Bezpieczeństwo</h1>
          <p>Widok wykorzystywany w trakcie ćwiczeń.</p>
        </div>
      </section>
      <section className="list security">
        <article>
          <div>
            <h3>Logowanie do banku</h3>
            <p>Sprawdź dostęp do konta.</p>
          </div>
          <button onClick={() => navigate("access")}>Otwórz dostęp</button>
        </article>
        <article>
          <div>
            <h3>Centrum bezpieczeństwa</h3>
            <p>Wersja startowa celowo nie ma pełnej ochrony.</p>
          </div>
          <span>Wymaga konfiguracji</span>
        </article>
      </section>
    </>
  );
}
