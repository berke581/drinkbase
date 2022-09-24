import { PostRepository } from './PostRepository'
import { PostDto } from './dtos/PostDto'

export class PostService {
  private readonly _postRepository: PostRepository

  constructor(PostRepository: PostRepository) {
    this._postRepository = PostRepository
  }

  async createPost(data: PostDto) {
    await this._postRepository.create(data)
  }

  async listPosts(searchQuery = '', page = 1, pageSize = 12) {
    const totalCount = await this._postRepository.count(searchQuery)
    const result = await this._postRepository.findPaginated(searchQuery, page, pageSize)

    const posts = result.map((el) => new PostDto(el))

    return { data: posts, totalCount }
  }
}
