const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    hash = require('gulp-hash'),
    postcss = require('gulp-postcss'),
    babel = require('gulp-babel'),
    del = require('del');

const processors = [
    autoprefixer,
    cssnano
];

// Compile SCSS files to CSS
gulp.task('scss', function () {
    del(['static/css/**/*']);

    gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(hash())
        .pipe(gulp.dest('static/css'))
        //Create a hash map
        .pipe(hash.manifest('hash.json'))
        //Put the map in the data directory
        .pipe(gulp.dest('data/css'));
});

// Hash images
gulp.task('images', function () {
    del(['static/images/**/*']);
    gulp.src('src/images/**/*')
        .pipe(hash())
        .pipe(gulp.dest('static/images'))
        .pipe(hash.manifest('hash.json'))
        .pipe(gulp.dest('data/images'))
});

// Hash javascript
gulp.task('js', function () {
    del(['static/js/**/*'])
    gulp.src('src/js/**/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(hash())
        .pipe(gulp.dest('static/js'))
        .pipe(hash.manifest('hash.json'))
        .pipe(gulp.dest('data/js'));
});


// TODO add build task

// Watch asset folder for changes
gulp.task('watch', ['scss'], function () {
    gulp.watch('./src/scss/**/*', ['scss']);
    gulp.watch('./src/images/**/*', ['images']);
    gulp.watch('./src/js/**/*', ['js']);
});

gulp.task('build', ['scss', 'images', 'js']);

// Set watch as default task
gulp.task('default', ['watch']);