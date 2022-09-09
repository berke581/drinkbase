// why import?: https://stackoverflow.com/questions/65805015/extending-session-object-in-express-session
import 'express-session'
import { ObjectId } from 'mongoose'

declare module 'express-session' {
  interface SessionData {
    user: {
      username: string
    }
  }
}
