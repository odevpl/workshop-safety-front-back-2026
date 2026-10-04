import { findPosts, listPosts, publishPost } from '../services/posts.service.js';

export function getAll(req, res, next) {
  try {
    res.json(listPosts());
  } catch (error) {
    next(error);
  }
}

export function search(req, res, next) {
  try {
    res.json(findPosts(req.query.q ?? ''));
  } catch (error) {
    next(error);
  }
}

export function create(req, res, next) {
  try {
    // WORKSHOP: a fixed author makes the endpoint usable before authentication is added.
    res.status(201).json(publishPost({ ...req.body, authorId: 1 }));
  } catch (error) {
    next(error);
  }
}
