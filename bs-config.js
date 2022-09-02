/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
  ui: false,
  files: ['**/*.css', '**/*.pug', '**/*.ts', '**/*.js'],
  ignore: ['node_modules'],
  proxy: 'localhost:8081',
  port: 3000,
  notify: false,
  reloadDelay: 10,
}
