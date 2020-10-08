import { User } from './User';
import { Post } from './Post';
import { Reply } from './Reply';
import { Comment } from './Comment';
import { Category } from './Category';
import { Notice } from './Notice';
import { EmailCode } from './EmailCode';

const entities: (
	| typeof User
	| typeof Reply
	| typeof Comment
	| typeof Category
	| typeof Post
	| typeof Notice
	| typeof EmailCode
)[] = [User, Post, Reply, Comment, Category, Notice, EmailCode];

export default entities;
