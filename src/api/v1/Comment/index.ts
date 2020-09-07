import { Router } from 'express';
import createComment from './Comment.ctrl/createComment';
import deleteComment from './Comment.ctrl/deleteComment';
import modifyComment from './Comment.ctrl/modifyComment';
import getComments from './Comment.ctrl/getComments';

const router = Router();

router.post('/', createComment);
router.delete('/', deleteComment);
router.put('/', modifyComment);
router.get('/', getComments);

export default router;
