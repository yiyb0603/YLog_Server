import { Router } from 'express';
import deleteLike from './Like.ctrl/deleteLike';
import getLikes from './Like.ctrl/getLikes';
import postLike from './Like.ctrl/postLike';
import authMiddleware from '../../../lib/middleware/Auth';

const router = Router();

router.get('/:postIdx', getLikes);
router.post('/', authMiddleware.validateUser, postLike);
router.delete('/', authMiddleware.validateUser, deleteLike);

export default router;