import { db } from '../config/database.js';

export function findAllPosts() {
  return db.prepare(`
    SELECT posts.id, posts.title, posts.body, posts.created_at, users.display_name AS author
    FROM posts JOIN users ON users.id = posts.author_id ORDER BY posts.id DESC
  `).all();
}

export function searchPosts(term) {
  // WORKSHOP: intentionally vulnerable SQL construction for the SQL-injection exercise.
  return db.prepare(`SELECT id, title, body FROM posts WHERE title LIKE '%${term}%'`).all();
}

export function createPost({ title, body, authorId }) {
  // WORKSHOP: intentionally vulnerable SQL construction for the input-validation and SQL-injection exercises.
  return db.prepare(`INSERT INTO posts (title, body, author_id) VALUES ('${title}', '${body}', ${authorId})`)
    .run();
}
