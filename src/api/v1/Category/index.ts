import { Router } from 'express';
import CreateCategory from './Category.ctrl/createCategory';
import DeleteCategory from './Category.ctrl/deleteCategory';
import ModifyCategory from './Category.ctrl/modifyCategory';

const router = Router();

router.post('/', CreateCategory);
router.delete('/', DeleteCategory);
router.put('/', ModifyCategory);

export default router;
