import { UsersRepository } from './UsersRepository'
import { AuthService } from '@src/modules/auth/AuthService'
import { IUser } from './IUser'

export class UsersService {
  private readonly _usersRepository: UsersRepository
  private readonly _authService: AuthService

  constructor(usersRepository: UsersRepository, authService: AuthService) {
    this._usersRepository = usersRepository
    this._authService = authService
  }

  async getUserInfo(username: string): Promise<IUser | null> {
    const userInfo = await this._usersRepository.findByUsername(username)
    return userInfo
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

    this._usersRepository.create({ ...rest, password: hashedPassword })
  }

  async validatePassword(password: string, hashedPassword: string) {
    const doPasswordsMatch = await this._authService.comparePasswords(password, hashedPassword)
    return doPasswordsMatch
  }
}
