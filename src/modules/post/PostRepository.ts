import { Model } from 'mongoose'
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

  public async findPaginated(searchQuery: string, page: number, pageSize: number) {
    try {
      return await this._model
        .find(searchQuery ? { title: new RegExp(searchQuery, 'i') } : {})
        .sort({ created_at: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec()
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }
}
