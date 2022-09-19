import { Model } from 'mongoose'
import { MongoRepository } from '@src/shared/repository/base/MongoRepository'
import { IPost } from './IPost'

export class PostRepository extends MongoRepository<IPost> {
  constructor(model: Model<IPost>) {
    super(model)
  }
}
