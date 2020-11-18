import { Router } from 'express';
import Auth from './Auth';
import Member from './Member';
import Category from './Category';
import Post from './Post';
import Comment from './Comment';
import Reply from './Reply';
import Upload from './Upload';
import Notice from './Notice';
import Release from './Release';
import Profile from './Profile';
import Like from './Like';

const router = Router();

router.use('/auth', Auth);
router.use('/member', Member);
router.use('/category', Category);
router.use('/post', Post);
router.use('/comment', Comment);
router.use('/reply', Reply);
router.use('/upload', Upload);
router.use('/notice', Notice);
router.use('/release', Release);
router.use('/profile', Profile);
router.use('/like', Like);

export default router;
