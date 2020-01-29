const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

gulp.task('clear-dist', () => {
	return gulp.src('dist', { read: false, allowEmpty: true })
		.pipe(clean());
});

gulp.task('html-dist', () => {
	return gulp.src('src/dist-index.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			removeRedundantAttributes: true,
			removeTagWhitespace: true
		}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dist'));
});

gulp.task('js-dist', () => {
	return gulp.src('src/js/**/*.js')
		.pipe(terser())
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('css-dist', () => {
	return gulp.src('src/css/**/*css')
		.pipe(cleanCSS())
		.pipe(concat('styles.min.css'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('dist', gulp.series(
	'clear-dist',
	gulp.parallel(
		'html-dist',
		'js-dist',
		'css-dist'
	)
));
