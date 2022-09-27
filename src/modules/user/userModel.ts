// TODO: maybe use typegoose: https://stackoverflow.com/a/61154023

import { model, Schema } from 'mongoose'
import { IUser } from './IUser'

export const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
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

// create a partial unique index for documents with "is_deleted===false"
userSchema.index(
  { username: 1 },
  { unique: true, partialFilterExpression: { is_deleted: { $eq: false } } },
)
userSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { is_deleted: { $eq: false } } },
)

// use middleware to remove deleted results
userSchema.pre('find', function () {
  this.where({ is_deleted: false })
})
userSchema.pre('findOne', function () {
  this.where({ is_deleted: false })
})

export default model<IUser>('User', userSchema)
