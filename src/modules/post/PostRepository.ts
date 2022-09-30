import { Model, ObjectId } from 'mongoose'
import { MongoRepository } from '@src/shared/repository/base/MongoRepository'
import { IPost } from './IPost'
import HttpError from '@src/error/HttpError'

export class PostRepository extends MongoRepository<IPost> {
  constructor(model: Model<IPost>) {
    super(model)
  }

  public async getPost(postId: ObjectId) {
    return await this._model
      .findById(postId)
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

  public async count(searchQuery?: string) {
    try {
      return await this._model.count(searchQuery ? { title: new RegExp(searchQuery, 'i') } : {})
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }

  public async checkIfUserFavorited(postId: ObjectId, userId: ObjectId) {
    try {
      const result = await this._model
        .findOne({ _id: postId, favorited_by: { $elemMatch: { $eq: userId } } })
        .exec()
      return !!result
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }

  public async favoritePost(postId: ObjectId, userId: ObjectId) {
    try {
      await this._model.findOneAndUpdate(
        { _id: postId },
        { $push: { favorited_by: { $each: [userId] } } },
      )
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }

  public async unFavoritePost(postId: ObjectId, userId: ObjectId) {
    try {
      await this._model.findOneAndUpdate({ _id: postId }, { $pull: { favorited_by: userId } })
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }
}
