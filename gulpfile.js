const gulp = require('gulp')
const { parallel } = require('gulp')

const watch = require('gulp-watch')
const	sass = require('gulp-sass')
const	pug = require('gulp-pug')
const	browserSync = require('browser-sync')
const imagemin = require('gulp-imagemin')
const	svgSprite = require('gulp-svg-sprite')

/* Complete SASS */
function styles() {
  return gulp.src('src/styles/*.scss')
    .pipe(sass().on('error' , sass.logError))
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.reload({stream: true}))
}

/* Pug(Jade) */
function pug2html() {
  return gulp.src('src/**/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}))
}

/* JavaScript&jQuery */
function scripts() {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.reload({stream: true}))
}

/* Images */
function imageMinify() {
  return gulp.src('src/images/*.{gif,png,jpg,svg,webp}')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest('public/images'))
    .pipe(browserSync.reload({stream: true}))
}

/* SVG sprite */
function spriteSVG() {
  return gulp.src('src/images/sprite/*.svg') // svg files for sprite
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: "../sprite.svg"  //sprite file name
            }
        },
    }))
    .pipe(gulp.dest('public/images'))
    .pipe(browserSync.reload({stream: true}))
}

/* Browser-sync */
function browser() {
  browserSync({
    server: {
      baseDir: 'public'
    },
    notify: false
  })
}

function watching() {

//gulp.task('watch' , ['browserSync' , 'pug2html' , 'styles' , 'imageMinify' , 'svgSprite' , 'scripts'] , function(){
	watch('src/styles/*.scss' , styles);
	watch('src/*.pug' , pug2html);
	watch('src/js/*.js' , scripts);
	watch('src/images/*.{gif,png,jpg,svg,webp}' , imageMinify);
	watch('src/images/sprite/*.svg' , spriteSVG);
}

exports.watch = parallel(watching , browser , pug2html , styles , imageMinify , spriteSVG , scripts);
