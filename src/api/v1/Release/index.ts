import { Router } from 'express';
import authMiddleware from '../../../lib/middleware/Auth';
import createRelease from './Release.ctrl/createRelease';
import deleteRelease from './Release.ctrl/deleteRelease';
import getRelease from './Release.ctrl/getRelease';
import getReleases from './Release.ctrl/getReleases';
import modifyRelease from './Release.ctrl/modifyRelease';

const router = Router();

router.get('/', getReleases);
router.get('/:idx', getRelease);

router.post('/', authMiddleware.validateAdmin, createRelease);
router.put('/', authMiddleware.validateAdmin, modifyRelease);

router.delete('/', authMiddleware.validateAdmin, deleteRelease);

export default router;
