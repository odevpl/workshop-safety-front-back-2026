import { db } from '../config/database.js';

export function findAllPosts() {
  return db.prepare(`
    SELECT posts.id, posts.title, posts.body, posts.created_at, users.display_name AS author
    FROM posts JOIN users ON users.id = posts.author_id ORDER BY posts.id DESC
  `).all();
}

export function searchPosts(term) {
  return db.prepare('SELECT id, title, body FROM posts WHERE title LIKE ?').all(`%${term}%`);
}

export function createPost({ title, body, authorId }) {
  return db.prepare('INSERT INTO posts (title, body, author_id) VALUES (?, ?, ?)')
    .run(title, body, authorId);
}
