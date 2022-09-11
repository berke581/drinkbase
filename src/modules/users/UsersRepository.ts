import { Model } from 'mongoose'
import { MongoRepository } from '@src/shared/repository/base/MongoRepository'
import { IUser } from './IUser'

export class UsersRepository extends MongoRepository<IUser> {
  constructor(model: Model<IUser>) {
    super(model)
  }

  // TODO: improve: https://stackoverflow.com/questions/7101703/how-do-i-make-case-insensitive-queries-on-mongodb
  findByUsername(username: string) {
    return this._model.findOne({ username: { $regex: username, $options: 'i' } }).exec()
  }

  findByEmail(email: string) {
    return this._model.findOne({ email }).exec()
  }
}
