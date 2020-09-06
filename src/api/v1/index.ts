import { Router } from 'express';
import auth from './Auth';
import Category from './Category';
import Post from './Post';

const router = Router();

router.use('/auth', auth);
router.use('/category', Category);
router.use('/post', Post);

export default router;
