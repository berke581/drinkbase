import { ObjectId } from 'mongoose'
import { UsersRepository } from './UsersRepository'
import { AuthService } from '@src/modules/auth/AuthService'
import { IUser } from './IUser'
import { GetUserDto } from './dtos/GetUserDto'
import { DeleteUserDto } from './dtos/DeleteUserDto'

export class UsersService {
  private readonly _usersRepository: UsersRepository
  private readonly _authService: AuthService

  constructor(usersRepository: UsersRepository, authService: AuthService) {
    this._usersRepository = usersRepository
    this._authService = authService
  }

  async getUserInfo(username: string): Promise<GetUserDto | null> {
    const userInfo = await this._usersRepository.findByUsername(username)
    return userInfo === null ? null : new GetUserDto(userInfo)
  }

  async checkIfUsernameExists(username: string): Promise<IUser | null> {
    const result = await this._usersRepository.findByUsername(username)
    return result
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    const result = await this._usersRepository.findByEmail(email)
    return result !== null
  }

  async registerUser(data: IUser) {
    const { password, ...rest } = data

    const hashedPassword = await this._authService.hashPassword(password)

    await this._usersRepository.create({ ...rest, password: hashedPassword })
  }

  async validatePassword(password: string, hashedPassword: string) {
    const doPasswordsMatch = await this._authService.comparePasswords(password, hashedPassword)
    return doPasswordsMatch
  }

  async deleteUser(userId: ObjectId) {
    const deletedUser = await this._usersRepository.update(userId, { is_deleted: true })

    if (!deletedUser) {
      // TODO: handle errors: https://stackoverflow.com/questions/59117885/handling-errors-in-express-js-in-service-controller-layers
      throw Error('User not found with that ID.')
    }

    return new DeleteUserDto(deletedUser)
  }
}
