import { Model } from 'mongoose'
import { MongoRepository } from '@src/shared/repository/base/MongoRepository'
import { IUser } from './IUser'

export class UsersRepository extends MongoRepository<IUser> {
  constructor(model: Model<IUser>) {
    super(model)
  }

  public findByUsername(username: string) {
    return this._model.findOne({ username }).exec()
  }

  public findByEmail(email: string) {
    return this._model.findOne({ email }).exec()
  }
}
