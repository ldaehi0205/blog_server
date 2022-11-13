import express from 'express';
import { createUser, checkAlreadyUser } from '../data/auth.js';
import { body } from 'express-validator';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

const validUserInfo = [
  body('name').trim().notEmpty().withMessage('name is missing'),
  body('password').trim().notEmpty().withMessage('password is missing'),
  body('user_id').trim().notEmpty().withMessage('id is missing'),
  body('email').trim().isEmail().normalizeEmail().withMessage('invalid email'),
];

/** user validation 체크 */
const checkUserInfo = async (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length === 0) {
    return next();
  }
  res.status(400).json({ error_msg: `${errors[0].msg}` });
};

/** 회원가입  */
/**
 * @swagger
 * paths:
 *  /auth/signup:
 *   post:
 *    tags: [Users]
 *    description: 회원가입
 *    parameters:
 *    - in: body
 *      name: user
 *      required: true
 *      schema:
 *       properties:
 *        user_id:
 *         type: string
 *        password:
 *         type: string
 *        name:
 *         type: string
 *        email:
 *         type: string
 *    responses:
 *     200:
 *      description: 유저 생성 성공
 *     400:
 *      description: 실패
 */
router.post('/signup', ...validUserInfo, checkUserInfo, async (req, res) => {
  const { user_id, password, name, email } = req.body;

  const AlreadyUser = await checkAlreadyUser(user_id);
  if (AlreadyUser) {
    res.status(400).json({ msg: 'Already user' });
    return;
  }

  const hashedpw = await bcrypt.hash(password, 12);
  const user = await createUser(user_id, hashedpw, name, email);
  const token = jwt.sign({ id: user }, 'ldh', { expiresIn: '1h' });
  res.status(200).json({ token, result: 200 });
});

/**
 * @swagger
 * paths:
 *  /auth/login:
 *   post:
 *    tags: [Users]
 *    description: 로그인
 *    parameters:
 *    - in: body
 *      name: user
 *      required: true
 *      schema:
 *       properties:
 *        user_id:
 *         type: string
 *        password:
 *         type: string
 *    responses:
 *     200:
 *      description: 로그인 성공
 *     400:
 *      description: 실패
 */
router.post('/login', async (req, res) => {
  const { user_id, password } = req.body;
  const AlreadyUser = await checkAlreadyUser(user_id);

  // 존재하지않는 id
  if (!AlreadyUser) {
    res.status(400).json({ msg: 'Invalid user or password' });
  }

  if (AlreadyUser.user_id === user_id) {
    const comparedPw = await bcrypt.compare(password, AlreadyUser.password);
    //로그인 성공
    if (comparedPw) {
      const token = jwt.sign({ id: AlreadyUser.id }, 'ldh', {
        expiresIn: '1h',
      });
      res.status(200).json({ token, result: 200 });
    }
  }
});

export default router;
