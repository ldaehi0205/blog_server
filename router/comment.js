import express from 'express';
import { createComment, getComments } from '../data/comment.js';

const router = express.Router();

/** 댓글 작성 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const comments = await getComments(id);

  res.status(200).json({ result: 200, data: comments });
});

/** 댓글 등록 */
router.post('/', async (req, res) => {
  const { postId, commenter, content } = req.body;

  await createComment(postId, commenter, content);

  res.status(200).json({ result: 200 });
});

export default router;
