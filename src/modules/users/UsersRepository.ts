import { Model } from 'mongoose'
import { MongoRepository } from '@src/shared/repository/base/MongoRepository'
import { IUser } from './IUser'

export class UsersRepository extends MongoRepository<IUser> {
  constructor(model: Model<IUser>) {
    super(model)
  }

  findByUsername(username: string) {
    return this._model.findOne({ username }).exec()
  }

  findByEmail(email: string) {
    return this._model.findOne({ email }).exec()
  }
}
