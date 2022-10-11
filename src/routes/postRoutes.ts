import express from 'express'
import asyncHandler from 'express-async-handler'
import postModel from '@src/modules/post/postModel'
import { PostController } from '@src/modules/post/PostController'
import { PostService } from '@src/modules/post/PostService'
import { PostRepository } from '@src/modules/post/PostRepository'
import { authGuard } from '@src/middlewares/authGuard'
import { validator } from '@src/middlewares/validator'
import { imageUpload } from '@src/middlewares/imageUpload'
import { postSchema } from '@src/schemas'

const postController = new PostController(new PostService(new PostRepository(postModel)))

const router = express.Router()

// GET
router.get('/browse', asyncHandler(postController.listView.bind(postController)))
//protected routes
router.get('/new', authGuard, asyncHandler(postController.postView.bind(postController)))

router.get('/:postId', asyncHandler(postController.getView.bind(postController)))

// POST
// protected routes
router.post(
  '/new',
  authGuard,
  imageUpload('image'),
  validator(postSchema),
  asyncHandler(postController.post.bind(postController)),
)
router.post('/favorite', authGuard, asyncHandler(postController.favorite.bind(postController)))

export default router
