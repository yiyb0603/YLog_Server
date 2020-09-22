import { Router } from 'express';
import CreateCategory from './Category.ctrl/createCategory';
import DeleteCategory from './Category.ctrl/deleteCategory';
import ModifyCategory from './Category.ctrl/modifyCategory';
import getCategories from './Category.ctrl/getCategories';
import authMiddleware from '../../../lib/middleware/Auth';

const router = Router();

router.get('/', getCategories);
router.post('/', authMiddleware.validateAdmin, CreateCategory);
router.delete('/', authMiddleware.validateAdmin, DeleteCategory);
router.put('/', authMiddleware.validateAdmin, ModifyCategory);

export default router;
