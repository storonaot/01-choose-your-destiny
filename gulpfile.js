const gulp = require('gulp')

const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const debug = require('gulp-debug')
const browserSync = require('browser-sync').create()
const newer = require('gulp-newer')
const pug = require('gulp-pug')
const imagemin = require('gulp-imagemin')

const babel = require("gulp-babel")
const concat = require("gulp-concat")


gulp.task('styles:build', () => {
  return gulp.src('src/css/main.sass', {base: 'src'})
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(debug({title: 'styles'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dest'))
})

gulp.task('images:build', () => {
  return gulp.src('src/img/**/*.*', {base: 'src'})
    .pipe(newer('dest'))
    .pipe(debug({title: 'images'}))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true
    }))
    .pipe(gulp.dest('dest'))
})

gulp.task('html:build', () => {
  return gulp.src('src/**/*.jade')
    .pipe(debug({title: 'html'}))
    .pipe(pug())
    .pipe(gulp.dest('dest'))
})

gulp.task('js:build', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("main.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dest/js"));
})

gulp.task('clean', () => {
  return del('dest')
})

gulp.task('build',
  gulp.series('clean',
    gulp.parallel('js:build', 'html:build', 'images:build', 'styles:build')
  )
)

gulp.task('watch', () => {
  gulp.watch('src/css/**/*.*', gulp.series('styles:build'))
  gulp.watch('src/js/**/*.js', gulp.series('js:build'))
  gulp.watch('src/**/*.jade', gulp.series('html:build'))
  gulp.watch('src/img/**/*.*', gulp.series('images:build'))
})

gulp.task('serve', () => {
  browserSync.init({
    server: 'dest',
    port: 8080,
    ui: {
      port: 8081,
    },
  })
  browserSync.watch('dest/**/*.*').on('change', browserSync.reload)
})

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')))
