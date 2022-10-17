import { ObjectId } from 'mongoose'
import HttpError from '@src/error/HttpError'
import FlashError from '@src/error/FlashError'
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

  public async getUserInfo(username: string): Promise<UserDto | null> {
    const userInfo = await this._userRepository.findByUsername(username)
    return userInfo === null ? null : new UserDto(userInfo)
  }

  public async registerUser(data: IUser) {
    const { password, ...rest } = data

    const usernameExists = await this.checkIfUsernameExists(rest.username)
    if (usernameExists) {
      throw FlashError.BadRequest('Username not available')
    }

    const emailExists = await this.checkIfEmailExists(rest.email)
    if (emailExists) {
      throw FlashError.BadRequest('E-mail not available')
    }

    const hashedPassword = await this._authService.hashPassword(password)

    await this._userRepository.create({ ...rest, password: hashedPassword })
  }

  public async loginUser(username: string, password: string) {
    const user = await this._userRepository.findByUsername(username)

    if (!user) {
      throw FlashError.Unauthorized('No user found with those credentials')
    }

    const hashedPassword = user.password
    const isLoginSuccessful = await this.validatePassword(password, hashedPassword)

    if (!isLoginSuccessful) {
      throw FlashError.Unauthorized('Login failed')
    }

    return { userId: user._id, username }
  }

  public async deleteUser(userId: ObjectId) {
    const deletedUser = await this._userRepository.update(userId, { is_deleted: true })

    if (!deletedUser) {
      throw HttpError.NotFound('User not found')
    }
  }

  private async validatePassword(password: string, hashedPassword: string) {
    const doPasswordsMatch = await this._authService.comparePasswords(password, hashedPassword)
    return doPasswordsMatch
  }

  private async checkIfUsernameExists(username: string): Promise<boolean> {
    const result = await this._userRepository.findByUsername(username)
    return result !== null
  }

  private async checkIfEmailExists(email: string): Promise<boolean> {
    const result = await this._userRepository.findByEmail(email)
    return result !== null
  }
}
