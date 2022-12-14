import { model, Schema } from 'mongoose'
import { IPost } from './IPost'

export const postSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: Object,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    favorited_by: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
)

export default model<IPost>('Post', postSchema)
