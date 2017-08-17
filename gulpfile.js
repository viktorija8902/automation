var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// for development
gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint', 'scripts'], function() {
	browserSync.init({
		server: 'dist'
	});

	gulp.watch('sass/**/*.scss', ['styles']); // which files to watch, which task to execute if change occurs
	gulp.watch('js/**/*.js', ['lint']);
	gulp.watch('./index.html', ['copy-html']);
	gulp.watch('./dist/index.html').on('change', browserSync.reload);
	gulp.watch('img/*', ['copy-images']);
});

// for production
gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'lint',
	'scripts-dist'
]);

gulp.task('lint', () => {
	// ESLint ignores files with "node_modules" paths. 
	// So, it's best to have gulp ignore the directory as well. 
	// Also, Be sure to return the stream from the task; 
	// Otherwise, the task may end before the stream has finished. 
	return gulp.src(['js/**/*.js'])
		// eslint() attaches the lint output to the "eslint" property 
		// of the file object so it can be used by other modules. 
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console. 
		// Alternatively use eslint.formatEach() (see Docs). 
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on 
		// lint error, return the stream and pipe to failAfterError last. 
		.pipe(eslint.failAfterError());
});

gulp.task('copy-html', function() {
	gulp.src('./index.html') // takes from source
		.pipe(gulp.dest('dist')); // saves to destination
});

gulp.task('copy-images', function() {
	gulp.src('img/*')
		.pipe(imagemin(
			[
				imagemin.jpegtran({progressive: true}),
				pngquant({speed: 11, quality: 80})
			], {
				verbose: true
			}
		))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss') 
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError) // converts scss to css, logs error if it happens
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	gulp.src('js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js')) // combines all js files into one
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
	gulp.src('js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(uglify()) // minifies js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('tests', function() {
	gulp.src('tests/spec/*.js')
		.pipe(jasmine({
			integration: true,
			vendor: 'js/**/*.js'
		}));
});
