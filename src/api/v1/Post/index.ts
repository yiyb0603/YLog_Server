import { Router } from 'express';
import CreatePost from './Post.ctrl/createPost';
import deletePost from './Post.ctrl/deletePost';
import modifyPost from './Post.ctrl/modifyPost';

const router = Router();

router.post('/', CreatePost);
router.delete('/', deletePost);
router.put('/', modifyPost);

export default router;
