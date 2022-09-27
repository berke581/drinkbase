import { ObjectId } from 'mongoose'
import { IPost } from '@src/modules/post/IPost'

export class PostDto {
  public readonly _id: ObjectId
  public readonly author: ObjectId
  public readonly title: string
  public readonly body: string
  public readonly image: string

  constructor(post: IPost) {
    this._id = post._id
    this.author = post.author
    this.title = post.title
    this.body = post.body
    this.image = post.image
  }
}
