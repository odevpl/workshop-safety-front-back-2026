import { useState } from "react";
export function TransfersPage({ onTransfer }) {
  const [form, setForm] = useState({
    recipient: "",
    account: "",
    amount: "",
    title: "",
  });
  const submit = async (e) => {
    e.preventDefault();
    if (
      await onTransfer({
        title: form.title,
        body: `Odbiorca: ${form.recipient}; rachunek: ${form.account}; kwota: ${form.amount}`,
      })
    )
      setForm({ recipient: "", account: "", amount: "", title: "" });
  };
  const field = (key, label, hint) => (
    <label>
      {label}
      <input
        value={form[key]}
        placeholder={hint}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
    </label>
  );
  return (
    <form className="transfer" onSubmit={submit}>
      <p className="eyebrow">Nowa dyspozycja</p>
      <h1>Przelew krajowy</h1>
      {field("recipient", "Odbiorca", "Nazwa odbiorcy")}
      {field("account", "Numer rachunku", "00 0000 0000 0000 0000 0000 0000")}
      {field("amount", "Kwota", "0,00 PLN")}
      {field("title", "Tytuł", "Np. rachunek za prąd")}
      <button>Przejdź do potwierdzenia</button>
      <small>Wersja szkoleniowa: formularz celowo nie waliduje danych.</small>
    </form>
  );
}
