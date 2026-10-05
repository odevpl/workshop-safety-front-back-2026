import { useEffect, useState } from "react";
import { LoginForm } from "../features/auth/components/LoginForm.jsx";
import { RegisterForm } from "../features/auth/components/RegisterForm.jsx";
import {
  createPost,
  getCurrentUser,
  getPosts,
  login,
  register,
} from "../services/api.client.js";
import { DashboardPage } from "../pages/DashboardPage.jsx";
import { TransfersPage } from "../pages/TransfersPage.jsx";
import { ActivityPage } from "../pages/ActivityPage.jsx";
import { SecurityPage } from "../pages/SecurityPage.jsx";
import { ProductsPage } from "../pages/ProductsPage.jsx";

const links = [
  ["dashboard", "Pulpit"],
  ["transfers", "Przelewy"],
  ["activity", "Historia"],
  ["products", "Produkty"],
  ["security", "Bezpieczeństwo"],
  ["access", "Dostęp"],
];
const getRoute = () => location.hash.slice(2) || "access";

export function App() {
  const [route, setRoute] = useState(getRoute());
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = (page) => {
    location.hash = `/${page}`;
  };
  const loadPosts = async () => {
    try {
      setPosts(await getPosts());
    } catch (e) {
      setMessage(e.message);
    }
  };
  useEffect(() => {
    loadPosts();
    getCurrentUser()
      .then(({ user: sessionUser }) => setUser(sessionUser))
      .catch(() => setUser(null));
    const onHash = () => setRoute(getRoute());
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);
  const onLogin = async (data) => {
    try {
      const result = await login(data);
      setUser(result.user);
      setMessage(`Zalogowano: ${result.user.displayName}`);
      navigate("dashboard");
    } catch (e) {
      setMessage(e.message);
    }
  };
  const onRegister = async (data) => {
    try {
      const result = await register(data);
      setMessage(`Utworzono konto: ${result.email}`);
      return true;
    } catch (e) {
      setMessage(e.message);
      return false;
    }
  };
  const onTransfer = async (data) => {
    try {
      await createPost(data);
      await loadPosts();
      setMessage("Dyspozycja została przyjęta.");
      return true;
    } catch (e) {
      setMessage(e.message);
      return false;
    }
  };
  const activeRoute = user ? route : "access";
  const page = {
    dashboard: <DashboardPage navigate={navigate} />,
    transfers: <TransfersPage onTransfer={onTransfer} />,
    activity: <ActivityPage posts={posts} />,
    products: <ProductsPage />,
    security: <SecurityPage navigate={navigate} />,
    access: (
      <section className="access">
        <div>
          <p className="eyebrow">Vistula Bank</p>
          <h1>Dostęp do bankowości</h1>
          <p>Celowo podatne logowanie i rejestracja na potrzeby warsztatu.</p>
        </div>
        <div className="access-forms">
          <LoginForm onLogin={onLogin} user={user} />
          <RegisterForm onRegister={onRegister} />
        </div>
      </section>
    ),
  }[activeRoute] || <DashboardPage navigate={navigate} />;
  return (
    <div className="shell">
      <aside>
        <a className="brand" href={user ? "#/dashboard" : "#/access"}>
          V Vistula Bank
        </a>
        {user && (
          <nav>
            {links
              .filter(([key]) => key !== "access")
              .map(([key, label]) => (
                <a
                  key={key}
                  className={activeRoute === key ? "active" : ""}
                  href={`#/${key}`}
                >
                  {label}
                </a>
              ))}
          </nav>
        )}
      </aside>
      <div className="content">
        <header>
          <span>● Bankowość internetowa</span>
          {user ? (
            <b>{user.displayName || user.email}</b>
          ) : (
            <span>Bezpieczne logowanie</span>
          )}
        </header>
        <main>
          {message && <p className="message">{message}</p>}
          {page}
        </main>
      </div>
    </div>
  );
}
