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

  async listPosts(): Promise<PostDto[]> {
    const result = await this._postRepository.find({})
    return result.map((el) => new PostDto(el))
  }
}
