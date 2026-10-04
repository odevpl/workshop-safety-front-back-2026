import { useState } from "react";
import * as yup from "yup";

const registerSchema = yup.object({
  displayName: yup.string().trim().min(2, "Nazwa musi mieć co najmniej 2 znaki.").max(60, "Nazwa może mieć maksymalnie 60 znaków.").required("Podaj nazwę wyświetlaną."),
  email: yup.string().trim().email("Podaj poprawny adres e-mail.").max(254).required("Podaj adres e-mail."),
  password: yup.string().min(12, "Hasło musi mieć co najmniej 12 znaków.").max(128).required("Podaj hasło."),
});

export function RegisterForm({ onRegister }) {
  const [account, setAccount] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await registerSchema.validate(account, { abortEarly: false });
      setErrors({});
      const registered = await onRegister(account);
      if (registered) setAccount({ displayName: "", email: "", password: "" });
    } catch (error) {
      setErrors(Object.fromEntries(error.inner.map(item => [item.path, item.message])));
    }
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
        {errors.displayName && <span className="field-error">{errors.displayName}</span>}
      </label>
      <label>
        E-mail
        <input
          value={account.email}
          onChange={(event) =>
            setAccount({ ...account, email: event.target.value })
          }
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </label>
      <label>
        Hasło
        <input
          value={account.password}
          onChange={(event) =>
            setAccount({ ...account, password: event.target.value })
          }
        />
        {errors.password && <span className="field-error">{errors.password}</span>}
      </label>
      <button>Utwórz konto</button>
      <small>Wersja startowa celowo nie waliduje tych pól.</small>
    </form>
  );
}
