import { Router } from 'express';
import CreateCategory from './Category.ctrl/createCategory';
import DeleteCategory from './Category.ctrl/deleteCategory';
import ModifyCategory from './Category.ctrl/modifyCategory';
import getCategories from './Category.ctrl/getCategories';

const router = Router();

router.get('/', getCategories);
router.post('/', CreateCategory);
router.delete('/', DeleteCategory);
router.put('/', ModifyCategory);

export default router;
