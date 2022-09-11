import { IUser } from '@src/modules/users/IUser'

export class DeleteUserDto {
  public readonly _isDeleted: boolean

  constructor(user: IUser) {
    this._isDeleted = user.is_deleted
  }
}
