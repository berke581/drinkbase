import { exec } from 'child_process'
import gulp, { series, TaskFunction } from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import { replaceTscAliasPaths } from 'tsc-alias'
import clean from './clean'

const sass = gulpSass(dartSass)

const copyFiles: TaskFunction = (cb) => {
  gulp
    .src(['./src/views*/**/*', './{.env,package.json}', './public*/**/*'])
    .pipe(gulp.dest('./dist'))

  cb()
}

const resolveAlias: TaskFunction = (cb) => {
  replaceTscAliasPaths()

  cb()
}

const buildCss: TaskFunction = (cb) => {
  gulp
    .src('./src/sass/style.scss')
    .pipe(
      sass({ outputStyle: 'compressed', includePaths: ['src/sass/'], sourceMap: false }).on(
        'error',
        sass.logError,
      ),
    )
    .pipe(gulp.dest('./public/stylesheets/'))

  cb()
}

const buildTS: TaskFunction = (cb) => {
  exec('tsc -p tsconfig.prod.json', function (err) {
    cb(err)
  })
}

const build = series(clean, buildCss, buildTS, copyFiles, resolveAlias)

export { build }
