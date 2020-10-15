import { Router } from 'express';
import SignUp from './Auth.ctrl/SignUp';
import SignIn from './Auth.ctrl/SignIn';
import FcmToken from './Auth.ctrl/FcmToken';
import SendEmail from './Auth.ctrl/SendEmail';
import CheckEmailCode from './Auth.ctrl/CheckEmailCode';
import CheckAdminCode from './Auth.ctrl/CheckAdminCode';
import EmailDuplicate from './Auth.ctrl/EmailDuplicate';
import authMiddleware from '../../../lib/middleware/Auth';

const router = Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.post('/fcm', authMiddleware.validateUser, FcmToken);
router.post('/send', SendEmail);
router.post('/check-admin', CheckAdminCode);
router.post('/check', CheckEmailCode);
router.post('/duplicate', EmailDuplicate);

export default router;
