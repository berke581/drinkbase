// TODO: maybe use typegoose: https://stackoverflow.com/a/61154023

import { model, Schema } from 'mongoose'
import { IUser } from './IUser'

export const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    // TODO: https://stackoverflow.com/questions/43276776/mongoose-soft-delete-using-object-id
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
)

export default model<IUser>('User', userSchema)
