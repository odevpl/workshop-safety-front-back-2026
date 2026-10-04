export function DashboardPage({ navigate }) {
  return (
    <>
      <section className="intro">
        <div>
          <p className="eyebrow">Dzień dobry</p>
          <h1>Twoje finanse</h1>
          <p>Przegląd produktów i ostatnich działań.</p>
        </div>
        <button onClick={() => navigate("transfers")}>Nowy przelew</button>
      </section>
      <section className="balance">
        <div>
          <p>Łączne saldo</p>
          <strong>
            18 420,64 <small>PLN</small>
          </strong>
          <span>+ 2 140,00 PLN w tym miesiącu</span>
        </div>
        <b>V</b>
      </section>
      <section className="grid">
        <article>
          <p>Konto osobiste</p>
          <h2>12 840,64 PLN</h2>
          <small>•••• 4821</small>
        </article>
        <article>
          <p>Oszczędności</p>
          <h2>5 580,00 PLN</h2>
          <small>Cel: Wakacje</small>
        </article>
        <article>
          <p>Szybki dostęp</p>
          <a href="#/activity">Historia operacji →</a>
          <a href="#/security">Centrum bezpieczeństwa →</a>
        </article>
      </section>
    </>
  );
}
