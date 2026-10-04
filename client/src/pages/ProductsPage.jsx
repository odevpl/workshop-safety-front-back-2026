export function ProductsPage() {
  return (
    <>
      <section className="intro">
        <div>
          <p className="eyebrow">Oferta</p>
          <h1>Produkty</h1>
          <p>Przykładowa oferta banku demonstracyjnego.</p>
        </div>
      </section>
      <section className="grid products">
        {[
          "Konto oszczędnościowe",
          "Karta wielowalutowa",
          "Kredyt gotówkowy",
        ].map((name) => (
          <article key={name}>
            <h2>{name}</h2>
            <p>Elastyczny produkt dopasowany do Twoich planów.</p>
            <button className="outline">Poznaj ofertę</button>
          </article>
        ))}
      </section>
    </>
  );
}
