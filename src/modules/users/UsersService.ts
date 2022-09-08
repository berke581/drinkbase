import bcrypt from 'bcrypt'
import { UsersRepository } from './UsersRepository'
import { IUser } from './IUser'

export class UsersService {
  private readonly _repository: UsersRepository

  constructor(repository: UsersRepository) {
    this._repository = repository
  }

  async checkIfUserExists(username: string): Promise<boolean> {
    const result = await this._repository.findByUsername(username)
    return result !== null
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    const result = await this._repository.findByEmail(email)
    return result !== null
  }

  async registerUser(data: IUser) {
    const { password, ...rest } = data

    const hashedPassword = await this.hashPassword(password)

    this._repository.create({ ...rest, password: hashedPassword })
  }

  async loginUser(username: string, password: string) {
    // TODO: login here
  }

  // TODO: revise line below
  private async hashPassword(plainTextPassword: string) {
    const saltRounds = 10

    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(plainTextPassword, salt)
  }
}
