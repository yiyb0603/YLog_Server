import { Router } from 'express';
import CreatePost from './Post.ctrl/createPost';
import deletePost from './Post.ctrl/deletePost';

const router = Router();

router.post('/', CreatePost);
router.delete('/', deletePost);

export default router;
