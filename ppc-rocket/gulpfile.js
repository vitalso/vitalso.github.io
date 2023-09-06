const gulp = require('gulp')
const { parallel, series } = require('gulp')

const watch = require('gulp-watch')
const	sass = require('gulp-sass')
//const	pug = require('gulp-pug')
const	browserSync = require('browser-sync')
//const imagemin = require('gulp-imagemin')
const	svgSprite = require('gulp-svg-sprite')
//const del = require('del');

/* Complete SASS */
function styles() {
  return gulp.src('scss/*.scss')
    .pipe(sass().on('error' , sass.logError))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({stream: true}))
}

/* SVG sprite */
function spriteSVG() {
  return gulp.src('img/sprite/*.svg') // svg files for sprite
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: "../sprite.svg"  //sprite file name
            }
        },
    }))
    .pipe(gulp.dest('img/main-img/'))
    .pipe(browserSync.reload({stream: true}))
}

function browser() {
  browserSync({
    server: {
      baseDir: './'
    },
    notify: false
  })
}

function watching() {

//gulp.task('watch' , ['browserSync' , 'styles'] , function(){
	watch('scss/*.scss' , styles);
  watch('img/sprite/*.svg' , spriteSVG);
}

exports.watch = parallel(watching , browser , styles , spriteSVG);

exports.build = series(
  parallel(styles , spriteSVG)
);
