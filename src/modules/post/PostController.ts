import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongoose'
import { PostService } from './PostService'
import HttpError from '@src/error/HttpError'

type GetListRequest = Request<
  Record<string, unknown>,
  unknown,
  unknown,
  { search?: string; page?: number }
>

type GetRequest = Request<
  {
    postId: ObjectId
  },
  unknown,
  unknown,
  Record<string, unknown>
>

export class PostController {
  private readonly _postService: PostService

  constructor(postService: PostService) {
    this._postService = postService
  }

  async listView(req: GetListRequest, res: Response, next: NextFunction) {
    const { search, page } = req.query
    const pageSize = 12

    try {
      const { data, totalCount } = await this._postService.listPosts(search, page, pageSize)

      const pageData = page || 1
      const isFirstPage = pageData <= 1
      const isLastPage = totalCount <= pageData * pageSize

      return res.render('browse', {
        data,
        page: pageData,
        isFirstPage,
        isLastPage,
      })
    } catch (err) {
      return next(err)
    }
  }

  async getView(req: GetRequest, res: Response, next: NextFunction) {
    const { postId } = req.params

    try {
      const post = await this._postService.getPost(postId)

      return res.render('post', { post })
    } catch (err) {
      return next(err)
    }
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

    const body = { author: userId, ...req.body }
    try {
      await this._postService.createPost(body)
    } catch (err) {
      return next(err)
    }

    return res.redirect('/')
  }
}
