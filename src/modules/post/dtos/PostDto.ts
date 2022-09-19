import { ObjectId } from 'mongoose'
import { IPost } from '@src/modules/post/IPost'

export class PostDto {
  public readonly author: ObjectId
  public readonly title: string
  public readonly body: string

  constructor(post: IPost) {
    this.author = post.author
    this.title = post.title
    this.body = post.body
  }
}
