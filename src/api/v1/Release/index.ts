import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/Auth';
import createPost from '../Post/Post.ctrl/createPost';
import deletePost from '../Post/Post.ctrl/deletePost';
import modifyPost from '../Post/Post.ctrl/modifyPost';
import getRelease from './Release.ctrl/getRelease';
import getReleases from './Release.ctrl/getReleases';

const router = Router();

router.get('/', getReleases);
router.get('/:idx', getRelease);

router.post('/', authMiddleware.validateAdmin, createPost);
router.put('/', authMiddleware.validateAdmin, modifyPost);

router.delete('/', authMiddleware.validateAdmin, deletePost);

export default router;
