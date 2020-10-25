import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/Auth';
import getProfile from './getProfile';
import modifyProfile from './modifyProfile';

const router = Router();

router.get('/', authMiddleware.validateUser, getProfile);
router.put('/', authMiddleware.validateUser, modifyProfile);

export default router;
