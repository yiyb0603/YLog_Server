import { Router } from 'express';
import upload from './upload.ctrl/upload';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

fs.readdir('public', (error: NodeJS.ErrnoException) => {
	if (error) {
		fs.mkdirSync('public');
	}
});

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, './public/');
	},
	filename: (_req, file, cb) => {
		cb(null, `${file.fieldname}-${uuidv4()}-${file.originalname}`);
	},
});

const uploadMid = multer({ storage }) as any;
const router = Router();

router.post('/', uploadMid.array('files'), upload);

export default router;
