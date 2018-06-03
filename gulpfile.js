const gulp      = require('gulp'),
  $             = require('gulp-load-plugins')(),
  rimraf        = require('rimraf'),
  fs            = require('fs-extra')

gulp.task('clean', () => rimraf.sync('build/**/*'))

const lang = (l) => {
  return gulp.src(['src/pug/index.pug'])
    .pipe($.data(f => ({
      cap: fs.readJsonSync(`src/json/${l}.json`),
      data: fs.readJsonSync(`src/json/index_${l}.json`)
    })))
    .pipe($.pug({pretty: true}))
    .on('error',e => {})
    .pipe($.rename(l == "en" ? "index.html" : `index_${l}.html`))
    .pipe(gulp.dest("build/"))
}

gulp.task('pug:ja', () => {
  lang('ja');
})
gulp.task('pug:en', () => {
  lang('en');
})

gulp.task('pug', ['pug:ja','pug:en'], () => {})

gulp.task('res',() => {
  gulp.src('./res/**/*')
    .pipe(gulp.dest('./build'))
})

gulp.task('default', ['clean','pug','res'], () => {})

gulp.task('watch', ['default'], () => {
  gulp.watch(['./src/pug/*','./src/json/*'] ,['pug'])
  gulp.watch(['./res/css/*'] ,['res'])
})
