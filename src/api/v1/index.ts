import { Router } from 'express';
import auth from './Auth';
import Category from './Category';
import Post from './Post';
import Comment from './Comment';

const router = Router();

router.use('/auth', auth);
router.use('/category', Category);
router.use('/post', Post);
router.use('/comment', Comment);

export default router;
