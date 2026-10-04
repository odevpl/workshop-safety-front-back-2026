import { API_URL } from "../config/api.config.js";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Wystąpił błąd komunikacji z API.");
  }

  return data;
}

export function getPosts() {
  return request("/posts");
}

export function login(credentials) {
  return request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}

export function register(account) {
  return request("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  });
}

export function createPost(post) {
  return request("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
}
