import { User } from './User';
import { Post } from './Post';
import { Reply } from './Reply';
import { Comment } from './Comment';
import { Category } from './Category';
import { Notice } from './Notice';
import { EmailCode } from './EmailCode';
import { Release } from './Release';
import { View } from './View';
import { Like } from './Like';

const entities: (
	| typeof User
	| typeof Reply
	| typeof Comment
	| typeof Category
	| typeof Post
	| typeof Notice
	| typeof EmailCode
	| typeof Release
	| typeof View
	| typeof Like
)[] = [User, Post, Reply, Comment, Category, Notice, EmailCode, Release, View, Like];

export default entities;
