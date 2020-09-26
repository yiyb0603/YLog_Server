import { Router } from 'express';
import createReply from './Reply.ctrl/createReply';
import deleteReply from './Reply.ctrl/deleteReply';
import getReplies from './Reply.ctrl/getReplies';
import modifyReply from './Reply.ctrl/modifyReply';
import authMiddleware from '../../../lib/middleware/Auth';

const router = Router();

router.get('/', getReplies);
router.post('/', authMiddleware.validateGuest, createReply);
router.put('/', modifyReply);
router.delete('/', deleteReply);

export default router;
