import { ObjectId } from 'mongoose'
import { PostRepository } from './PostRepository'
import { PostDto } from './dtos/PostDto'
import { IPost } from './IPost'
import HttpError from '@src/error/HttpError'
import { sanitizeEditorJSON } from '@src/utils/sanitize'

export class PostService {
  private readonly _postRepository: PostRepository

  constructor(PostRepository: PostRepository) {
    this._postRepository = PostRepository
  }

  async createPost(data: IPost) {
    await this._postRepository.create(data)
  }

  async getPost(postId?: ObjectId) {
    if (!postId) {
      throw HttpError.BadRequest()
    }

    const postInfo = await this._postRepository.getPost(postId)

    if (!postInfo) {
      return null
    }

    const { body: unsanitizedBody, ...rest } = new PostDto(postInfo)
    const body = sanitizeEditorJSON(unsanitizedBody)

    return { body, ...rest }
  }

  async listPosts(userId?: ObjectId, searchQuery = '', page = 1, pageSize = 12) {
    const totalCount = await this._postRepository.count(searchQuery)
    const result = await this._postRepository.findPaginated(searchQuery, page, pageSize)

    const posts = await Promise.all(
      result.map(async (el) => {
        const postDto = new PostDto(el)
        const isFavorited = userId ? await this.checkIfUserFavorited(postDto._id, userId) : false
        return { ...postDto, isFavorited }
      }),
    )

    return { data: posts, totalCount }
  }

  public async checkIfUserFavorited(postId: ObjectId, userId: ObjectId) {
    return await this._postRepository.checkIfUserFavorited(postId, userId)
  }

  public async changeFavoritedBy(postId: ObjectId, userId: ObjectId) {
    const userFavorited = await this.checkIfUserFavorited(postId, userId)

    if (userFavorited) {
      await this._postRepository.unFavoritePost(postId, userId)
      // currently unfavorited
      return false
    } else {
      await this._postRepository.favoritePost(postId, userId)
      // currently favorited
      return true
    }
  }
}
