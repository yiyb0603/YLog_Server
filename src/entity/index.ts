import { User } from './User';
import { Post } from './Post';
import { Reply } from './Reply';
import { Comment } from './Comment';
import { Category } from './Category';

const entities: (
	| typeof User
	| typeof Reply
	| typeof Comment
	| typeof Category
	| typeof Post
)[] = [User, Post, Reply, Comment, Category];

export default entities;
