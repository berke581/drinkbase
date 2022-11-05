declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number
    MONGO_URI: string
    REDIS_URI: string
    SESSION_SECRET: string
  }
}
