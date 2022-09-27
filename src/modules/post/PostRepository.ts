import { Model, ObjectId, Types } from 'mongoose'
import { MongoRepository } from '@src/shared/repository/base/MongoRepository'
import { IPost } from './IPost'
import HttpError from '@src/error/HttpError'

export class PostRepository extends MongoRepository<IPost> {
  constructor(model: Model<IPost>) {
    super(model)
  }

  public async count(searchQuery?: string) {
    try {
      return await this._model.count(searchQuery ? { title: new RegExp(searchQuery, 'i') } : {})
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }

  public async getPost(postId: string) {
    const validPostId = new Types.ObjectId(postId)
    return await this._model
      .findById(validPostId)
      .populate<{ author: { _id: ObjectId; username: string } }>({
        path: 'author',
        select: 'username',
      })
      .exec()
  }

  public async findPaginated(searchQuery: string, page: number, pageSize: number) {
    try {
      return await this._model
        .find(searchQuery ? { title: new RegExp(searchQuery, 'i') } : {})
        .sort({ created_at: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate<{ author: { _id: ObjectId; username: string } }>({
          path: 'author',
          select: 'username',
        })
        .exec()
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }
}
