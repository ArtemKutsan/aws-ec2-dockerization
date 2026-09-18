import { Router } from 'express';
import usersRouter from '#api/v1/routes/users.js';
import postsRouter from '#api/v1/routes/posts.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/posts', postsRouter);

export default router;
