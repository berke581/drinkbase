import { Request, Response, NextFunction } from 'express'
import { PostService } from './PostService'
import { PostDto } from './dtos/PostDto'
import HttpError from '@src/error/HttpError'

type GetListRequest = Request<
  Record<string, unknown>,
  unknown,
  unknown,
  { search?: string; page?: number }
>

export class PostController {
  private readonly _postService: PostService

  constructor(postService: PostService) {
    this._postService = postService
  }

  async listView(req: GetListRequest, res: Response) {
    const { search, page } = req.query
    const pageSize = 12
    const { data, totalCount } = await this._postService.listPosts(search, page, pageSize)

    const pageData = page || 1
    const isFirstPage = pageData <= 1
    const isLastPage = totalCount <= pageData * pageSize

    res.render('browse', {
      data,
      page: pageData,
      isFirstPage,
      isLastPage,
    })
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
