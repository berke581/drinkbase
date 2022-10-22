import { ObjectId } from 'mongoose'
import { IPost, Body } from '@src/modules/post/IPost'
import { PopulateField } from '@src/shared/types'

// https://mongoosejs.com/docs/typescript/populate.html
type Author = { _id: ObjectId; username: string }
export class PostDto {
  public readonly _id: ObjectId
  public readonly author: Author
  public readonly title: string
  public readonly body: Body
  public readonly favorited_by: ObjectId[]
  public readonly image: string
  public readonly created_at: Date

  constructor(post: PopulateField<IPost, 'author', Author>) {
    this._id = post._id
    this.author = post.author
    this.title = post.title
    this.body = post.body
    this.favorited_by = post.favorited_by
    this.image = post.image
    this.created_at = post.created_at
  }
}
