import { Router } from 'express';
import SignUp from './Auth.ctrl/SignUp';
import SignIn from './Auth.ctrl/SignIn';
import FcmToken from './Auth.ctrl/FcmToken';
import authMiddleware from '../../../lib/middleware/Auth';
import SendEmail from './Auth.ctrl/SendEmail';
import CheckEmailCode from './Auth.ctrl/CheckEmailCode';
import CheckAdminCode from './Auth.ctrl/CheckAdminCode';

const router = Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.post('/fcm', authMiddleware.validateUser, FcmToken);
router.post('/send', SendEmail);
router.post('/check-admin', CheckAdminCode);
router.post('/check', CheckEmailCode);

export default router;
