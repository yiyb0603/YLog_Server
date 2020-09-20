import { Router } from 'express';
import CreatePost from './Post.ctrl/createPost';
import deletePost from './Post.ctrl/deletePost';
import getPost from './Post.ctrl/getPost';
import getPosts from './Post.ctrl/getPosts';
import modifyPost from './Post.ctrl/modifyPost';

const router = Router();

router.post('/', CreatePost);
router.delete('/', deletePost);
router.put('/', modifyPost);
router.get('/', getPosts);
router.get('/:idx', getPost);

export default router;
