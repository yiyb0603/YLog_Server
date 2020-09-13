import { Router } from 'express';
import createReply from './Reply.ctrl/createReply';
import deleteReply from './Reply.ctrl/deleteReply';
import getReplies from './Reply.ctrl/getReplies';
import modifyReply from './Reply.ctrl/modifyReply';

const router = Router();

router.get('/', getReplies);
router.post('/', createReply);
router.put('/', modifyReply);
router.delete('/', deleteReply);

export default router;
