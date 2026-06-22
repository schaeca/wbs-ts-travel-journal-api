import { z } from 'zod';

export const postSchema = z.strictObject({
  title: z.string('Title must be a string').min(1, 'Title is required'),
  image: z.string('Image must be a string').min(1, 'Image is required'),
  content: z.string('Content must be a string').min(1, 'Content is required')
});

export const updatePostSchema = z.strictObject({
  title: z.string('Title must be a string').min(1, 'Title is required').optional(),
  image: z.string('Image must be a string').min(1, 'Image is required').optional(),
  content: z.string('Content must be a string').min(1, 'Content is required').optional()
})