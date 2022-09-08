import { Model } from 'mongoose'

import { IGenericRepository } from '@src/shared/repository/interfaces/IGenericRepository'

export abstract class MongoRepository<T> implements IGenericRepository<T> {
  protected readonly _model: Model<T>

  constructor(model: Model<T>) {
    this._model = model
  }

  // TODO: revise Partial uses

  find(item: Partial<T>): Promise<T[]> {
    return this._model.find(item).exec()
  }
  findOne(item: Partial<T>): Promise<T | null> {
    return this._model.findOne(item).exec()
  }
  findById(id: string): Promise<T | null> {
    return this._model.findById(id).exec()
  }
  create(item: T): Promise<T> {
    return this._model.create(item)
  }
  update(id: string, item: Partial<T>): Promise<T | null> {
    return this._model.findOneAndUpdate({ _id: id }, item).exec()
  }
  // TODO: improve below: https://github.com/mikemajesty/nestjs-mongoose-generic-repository/blob/master/utils/repository.ts
  async delete(id: string): Promise<boolean> {
    const result = await this._model.deleteOne({ _id: id }).exec()
    const { acknowledged } = result

    return acknowledged
  }
}