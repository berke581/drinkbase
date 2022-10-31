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
export type DrinkType = 'cocktail' | 'mocktail'
export interface IPost {
  _id: ObjectId
  type: DrinkType
  author: ObjectId
  title: string
  body: Body
  image: string
  favorited_by: Array<ObjectId>
  created_at: Date
}
