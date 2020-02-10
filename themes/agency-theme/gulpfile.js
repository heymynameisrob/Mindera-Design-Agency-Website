var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var purify = require('gulp-purifycss');
var autoprefixer = require('autoprefixer');
var csswring = require('csswring')

gulp.task('images', function () {
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('/static/images/'));
});

gulp.task('styles', function () {
  var plugins = [
    autoprefixer,
    csswring
  ];
  return gulp.src('src/styles/style.scss')
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest('static/'));
});

gulp.task('scripts', function () {
  return gulp.src(['/node_modules/babel-polyfill/dist/polyfill.js', 'src/scripts/**/*.js'])
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(babel({
      "presets": ["@babel/preset-env"]
    }))
    .pipe(uglify())
    .pipe(gulp.dest('static/'));
});

gulp.task('default', function () {
  gulp.watch("src/styles/**/*.scss", ['styles']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
});