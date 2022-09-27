import { Model, ObjectId } from 'mongoose'
import HttpError from '@src/error/HttpError'
import { IGenericRepository } from '@src/shared/repository/interfaces/IGenericRepository'

export abstract class MongoRepository<T> implements IGenericRepository<T, ObjectId> {
  protected readonly _model: Model<T>

  constructor(model: Model<T>) {
    this._model = model
  }

  async find(item: Partial<T>): Promise<T[]> {
    try {
      return await this._model.find(item).exec()
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }
  async findOne(item: Partial<T>): Promise<T | null> {
    try {
      return await this._model.findOne(item).exec()
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }
  async findById(id: ObjectId): Promise<T | null> {
    try {
      return await this._model.findById(id).exec()
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }

  async create(item: Partial<T>): Promise<T> {
    try {
      return await this._model.create(item)
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }
  async update(id: ObjectId, item: Partial<T>): Promise<T | null> {
    try {
      return await this._model.findOneAndUpdate({ _id: id }, item).exec()
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }
  // TODO: improve below: https://github.com/mikemajesty/nestjs-mongoose-generic-repository/blob/master/utils/repository.ts
  async delete(id: ObjectId): Promise<boolean> {
    try {
      const result = await this._model.deleteOne({ _id: id }).exec()
      const { acknowledged } = result

      return acknowledged
    } catch (err) {
      throw HttpError.InternalServerError()
    }
  }
}
