import HttpError from './HttpError'

class FlashError extends HttpError {
  constructor(code: number, message?: string) {
    super(code, message)
  }
}

export default FlashError
