import { Request, Response } from 'express'
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

type FavoriteRequest = Request<
  Record<string, unknown>,
  unknown,
  {
    post_id: ObjectId
  },
  Record<string, unknown>
>

export class PostController {
  private readonly _postService: PostService

  constructor(postService: PostService) {
    this._postService = postService
  }

  async listView(req: GetListRequest, res: Response) {
    const { search, page } = req.query
    const pageSize = 12

    const userId = req.session.user?.userId

    const { data, totalCount } = await this._postService.listPosts(userId, search, page, pageSize)

    const pageData = page || 1
    const isFirstPage = pageData <= 1
    const isLastPage = totalCount <= pageData * pageSize

    return res.render('browse', {
      data,
      page: pageData,
      isFirstPage,
      isLastPage,
    })
  }

  async getView(req: GetRequest, res: Response) {
    const { postId } = req.params

    const post = await this._postService.getPost(postId)

    return res.render('post', { post })
  }

  postView(req: Request, res: Response) {
    const validationErrors = req.flash('validationErrors')
    res.render('create-post', { formInfo: validationErrors })
  }

  async post(req: Request, res: Response) {
    const userId = req.session.user?.userId
    if (!userId) {
      throw HttpError.Unauthorized()
    }

    const body = { author: userId, ...req.body }

    await this._postService.createPost(body)

    res.status(200).json({
      message: 'Successfully created post!',
    })
  }

  async favorite(req: FavoriteRequest, res: Response) {
    const userId = req.session.user?.userId
    if (!userId) {
      throw HttpError.Unauthorized()
    }

    const { post_id } = req.body

    const favorited = await this._postService.changeFavoritedBy(post_id, userId)
    const postDetail = await this._postService.getPost(post_id)
    if (!postDetail) {
      return res.redirect('/')
    }

    const { favorited_by } = postDetail
    res
      .status(200)
      .json({ post_id, favorited, favorited_count: favorited_by.length, message: 'Successful' })
  }
}
