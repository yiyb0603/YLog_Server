import { Router } from 'express';
import createNotice from './Notice.ctrl/createNotice';
import deleteNotice from './Notice.ctrl/deleteNotice';
import getNotice from './Notice.ctrl/getNotice';
import getNotices from './Notice.ctrl/getNotices';
import modifyNotice from './Notice.ctrl/modifyNotice';
import authMiddleware from '../../../lib/middleware/Auth';

const router = Router();

router.post('/', authMiddleware.validateAdmin, createNotice);
router.put('/', authMiddleware.validateAdmin, modifyNotice);

router.get('/:idx', getNotice);
router.get('/', getNotices);

router.delete('/', authMiddleware.validateAdmin, deleteNotice);

export default router;
