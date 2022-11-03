import gulp, { watch, parallel, TaskFunction } from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import nodemon from 'nodemon'

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

export { develop }
