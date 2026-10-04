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
    res.status(201).json(publishPost({ ...req.body, authorId: req.user.id }));
  } catch (error) {
    next(error);
  }
}
