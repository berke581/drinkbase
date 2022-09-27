import { ObjectId } from 'mongoose'

export interface IPost {
  _id: ObjectId
  author: ObjectId
  title: string
  body: string
  image: string
  favorited_by: Array<ObjectId>
  created_at: Date
}
