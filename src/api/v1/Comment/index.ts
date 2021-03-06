import { Router } from 'express';
import createComment from './Comment.ctrl/createComment';
import deleteComment from './Comment.ctrl/deleteComment';
import modifyComment from './Comment.ctrl/modifyComment';
import getComments from './Comment.ctrl/getComments';
import authMiddleWare from '../../../lib/middleware/Auth';

const router = Router();

router.post('/', authMiddleWare.validateGuest, createComment);
router.delete('/', authMiddleWare.validateUser, deleteComment);
router.put('/', authMiddleWare.validateUser, modifyComment);
router.get('/', getComments);

export default router;
