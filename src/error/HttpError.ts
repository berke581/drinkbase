class HttpError extends Error {
  private readonly _code: number
  private readonly _message: string

  constructor(code: number, message = 'Unknown error') {
    super()

    this._code = code
    this._message = message
  }

  public get code() {
    return this._code
  }

  public override get message() {
    return this._message
  }

  static BadRequest(msg?: string) {
    return new this(400, msg || 'Bad Request')
  }

  static Unauthorized(msg?: string) {
    return new this(401, msg || 'Unauthorized')
  }

  static Forbidden(msg?: string) {
    return new this(403, msg || 'Forbidden')
  }

  static NotFound(msg?: string) {
    return new this(404, msg || 'Resource Not Found')
  }

  static InternalServerError(msg?: string) {
    return new this(500, msg || 'Internal Server Error')
  }
}

export default HttpError
