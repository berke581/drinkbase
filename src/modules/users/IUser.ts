import { ObjectId } from 'mongoose'

export interface IUser {
  _id: ObjectId
  username: string
  email: string
  password: string
  created_at: Date
  is_deleted: boolean
}
