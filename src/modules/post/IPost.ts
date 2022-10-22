import { ObjectId } from 'mongoose'

export type Body = {
  time: number
  blocks: Array<{
    id: string
    type: 'paragraph' | 'header' | 'delimiter' | 'list'
    data?: {
      text?: string
      level?: number
      style?: 'ordered' | 'unordered'
      items?: string[]
    }
  }>
  version: string
}
export interface IPost {
  _id: ObjectId
  author: ObjectId
  title: string
  body: Body
  image: string
  favorited_by: Array<ObjectId>
  created_at: Date
}
