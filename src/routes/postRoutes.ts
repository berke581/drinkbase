import express from 'express'
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
router.get('/browse', postController.listView.bind(postController))
//protected routes
router.get('/new', authGuard, postController.postView.bind(postController))

// POST
// protected routes
router.post(
  '/new',
  authGuard,
  imageUpload('image'),
  validator(postSchema),
  postController.post.bind(postController),
)

export default router
