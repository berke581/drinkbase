import bcrypt from 'bcrypt'

export class AuthService {
  public async hashPassword(plainTextPassword: string) {
    const saltRounds = 10

    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(plainTextPassword, salt)
  }

  public async comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
  }
}
