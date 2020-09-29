import { User } from './User';
import { Post } from './Post';
import { Reply } from './Reply';
import { Comment } from './Comment';
import { Category } from './Category';
import { Notice } from './Notice';

const entities: (
	| typeof User
	| typeof Reply
	| typeof Comment
	| typeof Category
	| typeof Post
	| typeof Notice
)[] = [User, Post, Reply, Comment, Category, Notice];

export default entities;
