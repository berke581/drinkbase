import { ObjectId } from 'mongoose'
import HttpError from '@src/error/HttpError'
import { AuthService } from '@src/modules/auth/AuthService'
import { UserRepository } from './UserRepository'
import { IUser } from './IUser'
import { UserDto } from './dtos/UserDto'

export class UserService {
  private readonly _userRepository: UserRepository
  private readonly _authService: AuthService

  constructor(userRepository: UserRepository, authService: AuthService) {
    this._userRepository = userRepository
    this._authService = authService
  }

  async getUserInfo(username: string): Promise<UserDto | null> {
    const userInfo = await this._userRepository.findByUsername(username)
    return userInfo === null ? null : new UserDto(userInfo)
  }

  async checkIfUsernameExists(username: string): Promise<IUser | null> {
    const result = await this._userRepository.findByUsername(username)
    return result
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    const result = await this._userRepository.findByEmail(email)
    return result !== null
  }

  async registerUser(data: IUser) {
    const { password, ...rest } = data

    const hashedPassword = await this._authService.hashPassword(password)

    await this._userRepository.create({ ...rest, password: hashedPassword })
  }

  async validatePassword(password: string, hashedPassword: string) {
    const doPasswordsMatch = await this._authService.comparePasswords(password, hashedPassword)
    return doPasswordsMatch
  }

  async deleteUser(userId: ObjectId) {
    const deletedUser = await this._userRepository.update(userId, { is_deleted: true })

    if (!deletedUser) {
      throw HttpError.NotFound('User not found')
    }
  }
}
