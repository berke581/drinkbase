import { ObjectId } from 'mongoose'
import { PostRepository } from './PostRepository'
import { PostDto } from './dtos/PostDto'
import { IPost } from './IPost'
import HttpError from '@src/error/HttpError'

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

    return await this._postRepository.findById(postId)
  }

  async listPosts(searchQuery = '', page = 1, pageSize = 12) {
    const totalCount = await this._postRepository.count(searchQuery)
    const result = await this._postRepository.findPaginated(searchQuery, page, pageSize)

    const posts = result.map((el) => new PostDto(el))

    return { data: posts, totalCount }
  }
}
