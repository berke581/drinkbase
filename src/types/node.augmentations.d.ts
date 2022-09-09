declare namespace NodeJS {
  interface ProcessEnv {
    // TODO: add PORT here
    MONGO_URI: string
    SESSION_SECRET: string
  }
}
