import express from 'express';
import { createPost, getPostId, getPostPage } from '../data/post.js';

const router = express.Router();

/** 게시물 작성 */
router.post('/write', async (req, res) => {
  const { title, user_id, create_at, content } = req.body;
  await createPost(title.trim(), user_id, create_at, content);

  res.status(201).json({ result: 200 });
});

/** id에 맞는 게시물 조회*/
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const postById = await getPostId(id);

  res.status(200).json({ result: 200, data: postById.dataValues });
});

/** page 별 게시물 조회*/
router.get('/', async (req, res) => {
  const { page } = req.query;

  const postByPage = await getPostPage(page - 1);

  res.status(200).json({ result: 200, data: postByPage.rows });
});

export default router;
