import { Model, ObjectId } from 'mongoose'
import HttpError from '@src/error/HttpError'
import { IGenericRepository } from '@src/shared/repository/interfaces/IGenericRepository'

export abstract class MongoRepository<T> implements IGenericRepository<T, ObjectId> {
  protected readonly _model: Model<T>

  constructor(model: Model<T>) {
    this._model = model
  }

  find(item: Partial<T>): Promise<T[]> {
    return this._model.find(item).exec()
  }
  findOne(item: Partial<T>): Promise<T | null> {
    return this._model.findOne(item).exec()
  }
  findById(id: ObjectId): Promise<T | null> {
    return this._model.findById(id).exec()
  }

  async create(item: Partial<T>): Promise<T> {
    try {
      return await this._model.create(item)
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }
  update(id: ObjectId, item: Partial<T>): Promise<T | null> {
    return this._model.findOneAndUpdate({ _id: id }, item).exec()
  }
  // TODO: improve below: https://github.com/mikemajesty/nestjs-mongoose-generic-repository/blob/master/utils/repository.ts
  async delete(id: ObjectId): Promise<boolean> {
    const result = await this._model.deleteOne({ _id: id }).exec()
    const { acknowledged } = result

    return acknowledged
  }
}
