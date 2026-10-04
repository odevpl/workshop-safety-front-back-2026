import { createPost, findAllPosts, searchPosts } from '../models/post.model.js';

export function listPosts() {
  return findAllPosts();
}

export function findPosts(term) {
  return searchPosts(term);
}

export function publishPost({ title, body, authorId }) {
  // WORKSHOP: no validation, length limits, or output encoding policy.
  const result = createPost({ title, body, authorId });
  return { id: result.lastInsertRowid, title, body };
}
