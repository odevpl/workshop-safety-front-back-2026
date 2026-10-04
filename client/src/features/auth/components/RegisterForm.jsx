import { useState } from "react";

export function RegisterForm({ onRegister }) {
  const [account, setAccount] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const registered = await onRegister(account);
    if (registered) setAccount({ displayName: "", email: "", password: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rejestracja</h2>
      <label>
        Nazwa wyświetlana
        <input
          value={account.displayName}
          onChange={(event) =>
            setAccount({ ...account, displayName: event.target.value })
          }
        />
      </label>
      <label>
        E-mail
        <input
          value={account.email}
          onChange={(event) =>
            setAccount({ ...account, email: event.target.value })
          }
        />
      </label>
      <label>
        Hasło
        <input
          value={account.password}
          onChange={(event) =>
            setAccount({ ...account, password: event.target.value })
          }
        />
      </label>
      <button>Utwórz konto</button>
      <small>Wersja startowa celowo nie waliduje tych pól.</small>
    </form>
  );
}
