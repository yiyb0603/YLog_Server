import { Router } from 'express';
import auth from './Auth';
import Category from './Category';

const router = Router();

router.use('/auth', auth);
router.use('/category', Category);

export default router;
