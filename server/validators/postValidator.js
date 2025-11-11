import Joi from 'joi';

/**
 * Validation schema for creating/updating a post
 */
export const postSchema = Joi.object({
  content: Joi.string().min(1).required().messages({
    'string.min': 'Post content cannot be empty',
    'any.required': 'Post content is required',
  }),
});
