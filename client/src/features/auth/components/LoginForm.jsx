import { useState } from "react";

export function LoginForm({ onLogin, user }) {
  const [credentials, setCredentials] = useState({
    email: "alice@example.test",
    password: "alice123",
  });

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(credentials);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Logowanie</h2>
      <label>
        E-mail
        <input
          value={credentials.email}
          onChange={(event) =>
            setCredentials({ ...credentials, email: event.target.value })
          }
        />
      </label>
      <label>
        Hasło
        <input
          type="password"
          value={credentials.password}
          onChange={(event) =>
            setCredentials({ ...credentials, password: event.target.value })
          }
        />
      </label>
      <button>Zaloguj się</button>
      {user && <small>Aktywny użytkownik: {user.email}</small>}
    </form>
  );
}
