import { Router } from 'express';
import CreatePost from './Post.ctrl/createPost';
import deletePost from './Post.ctrl/deletePost';
import getPost from './Post.ctrl/getPost';
import getPosts from './Post.ctrl/getPosts';
import modifyPost from './Post.ctrl/modifyPost';
import authMiddleware from '../../../lib/middleware/Auth';

const router = Router();

router.post('/', authMiddleware.validateAdmin, CreatePost);
router.delete('/', authMiddleware.validateAdmin, deletePost);
router.put('/', authMiddleware.validateAdmin, modifyPost);
router.get('/', getPosts);
router.get('/:idx', getPost);

export default router;
