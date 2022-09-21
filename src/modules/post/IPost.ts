import { ObjectId } from 'mongoose'

export interface IPost {
  _id: ObjectId
  author: ObjectId
  title: string
  body: string
  image: string
  created_at: Date
}
