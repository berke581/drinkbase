import { IUser } from '@src/modules/users/IUser'

export class UserDto {
  public readonly _username: string
  public readonly _email: string
  public readonly _createdAt: Date

  constructor(user: IUser) {
    this._username = user.username
    this._email = user.email
    this._createdAt = user.created_at
  }
}
