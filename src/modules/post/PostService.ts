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

  // IPost['_id']
  async getPost(postId?: string) {
    if (!postId) {
      throw HttpError.BadRequest()
    }

    const postInfo = await this._postRepository.getPost(postId)

    if (!postInfo) {
      return null
    }

    const post = new PostDto(postInfo)
    return post
  }

  async listPosts(searchQuery = '', page = 1, pageSize = 12) {
    const totalCount = await this._postRepository.count(searchQuery)
    const result = await this._postRepository.findPaginated(searchQuery, page, pageSize)

    const posts = result.map((el) => new PostDto(el))

    return { data: posts, totalCount }
  }
}
