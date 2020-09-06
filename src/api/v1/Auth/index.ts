import { Router } from 'express';
import SignUp from './Auth.ctrl/SignUp';
import SignIn from './Auth.ctrl/SignIn';

const router = Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);

export default router;
