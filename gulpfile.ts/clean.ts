import { parallel, TaskFunction } from 'gulp'
import rimraf from 'rimraf'

const cleanDist: TaskFunction = (cb) => {
  rimraf('dist/', cb)
}

const cleanStylesheets: TaskFunction = (cb) => {
  rimraf('public/stylesheets/', cb)
}

const clean = parallel(cleanDist, cleanStylesheets)

export default clean
