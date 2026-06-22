import { Router } from 'express';
import { authenticate, authorize, validateBody } from '#middleware';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from '#controllers';
import { postSchema, updatePostSchema } from '#schemas';

const postRoutes = Router();

postRoutes.route('/').get(getAllPosts).post(authenticate, validateBody(postSchema), createPost);

postRoutes.route('/:id').get(getSinglePost).put(authenticate, authorize("self"), validateBody(updatePostSchema), updatePost).delete(authenticate, authorize("self"), deletePost);

export default postRoutes;
