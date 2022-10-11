import process from 'process'
import { ChildProcess, spawn } from 'child_process'
import gulp, { watch, parallel, TaskFunction } from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import nodemon from 'nodemon'
import bs from 'browser-sync'

const browserSync = bs.create()
const sass = gulpSass(dartSass)

const buildCss: TaskFunction = (cb) => {
  gulp
    .src('./src/sass/style.scss')
    .pipe(
      sass({ outputStyle: 'compressed', includePaths: ['src/sass/'], sourceMap: true }).on(
        'error',
        sass.logError,
      ),
    )
    .pipe(gulp.dest('./public/stylesheets/'))

  cb()
}
const watchSass: TaskFunction = (cb) => {
  watch('src/sass/', buildCss)

  cb()
}

const startNodemon: TaskFunction = (cb) => {
  nodemon({})

  cb()
}

const develop = parallel(startNodemon, watchSass)
develop.displayName = 'start:dev'

const bsInit: TaskFunction = (cb) => {
  browserSync.init(
    {
      ui: false,
      files: ['**/*.css', '**/*.pug', '**/*.ts', '**/*.js'],
      ignore: ['node_modules'],
      proxy: 'localhost:8081',
      port: 3000,
      notify: false,
      reloadDelay: 10,
    },
    cb,
  )
}

const ui = parallel(develop, bsInit)
ui.displayName = 'start:ui'

let cp: ChildProcess
const production: TaskFunction = () => {
  cp = spawn('node', ['-r', 'dotenv-safe/config', './dist/server.js'], { stdio: 'inherit' })

  return cp
}
production.displayName = 'start:prod'

function handleExit() {
  if (cp.killed) {
    process.exit(0)
  }
}
process.on('SIGTERM', handleExit)
process.on('SIGINT', handleExit)

export { develop, ui, production }
