import { Router } from 'express';
import SignUp from './Auth.ctrl/SignUp';
import SignIn from './Auth.ctrl/SignIn';
import FcmToken from './Auth.ctrl/FcmToken';
import authMiddleware from '../../../lib/middleware/Auth';

const router = Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.post('/fcm', authMiddleware.validateUser, FcmToken);

export default router;
