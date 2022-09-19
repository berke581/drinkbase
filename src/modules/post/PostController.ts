import { Request, Response, NextFunction } from 'express'
import { PostService } from './PostService'
import { PostDto } from './dtos/PostDto'
import HttpError from '@src/error/HttpError'

export class PostController {
  private readonly _postService: PostService

  constructor(postService: PostService) {
    this._postService = postService
  }

  async listView(req: Request, res: Response) {
    const data = await this._postService.listPosts()

    res.render('browse', { data })
  }

  postView(req: Request, res: Response) {
    const validationErrors = req.flash('validationErrors')
    res.render('create-post', { formInfo: validationErrors })
  }

  async post(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.user?.userId

    if (!userId) {
      throw HttpError.Unauthorized()
    }

    const body = new PostDto({ author: userId, ...req.body })
    try {
      await this._postService.createPost(body)
    } catch (err) {
      return next(err)
    }

    return res.redirect('/')
  }
}
