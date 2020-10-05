import { Router } from 'express';
import allowMember from './Member.ctrl/allowMember';
import deleteMember from './Member.ctrl/deleteMember';
import refuseMember from './Member.ctrl/refuseMember';
import authMiddleware from '../../../lib/middleware/Auth';

const router = Router();

router.post('/allow', authMiddleware.validateAdmin, allowMember);
router.post('/refuse', authMiddleware.validateAdmin, refuseMember);
router.delete('/delete', authMiddleware.validateAdmin, deleteMember);

export default router;
