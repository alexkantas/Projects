let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let cleanCSS = require('gulp-clean-css');
let babel = require('gulp-babel');

let jsSourceFiles = 'public/js/index.1.js';

gulp.task('watch-changes', () => {
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./public/css/*.css').on('change', browserSync.reload);
	gulp.watch('./public/js/*.js').on('change', browserSync.reload);

	browserSync.init({
		server: './'
	});
});

// gulp.task('minify-css', () => {
// 	return gulp.src('css/*.css')
// 		.pipe(cleanCSS())
// 		.pipe(gulp.dest('dist'));
// });

// gulp.task('minify-js', () =>
// 	gulp.src('js/*.js')
// 		.pipe(babel({presets: ['env','minify']}))
// 		.pipe(gulp.dest('dist'))
// );

gulp.task('transpile-js', () =>
gulp.src(jsSourceFiles)
	.pipe(babel({presets: ['env']}))
	.pipe(gulp.dest('public/js/dist'))
);

// gulp.task('default', ['minify-js', 'minify-css']);
gulp.task('default', ['transpile-js']);
//gulp.task('default',['watch-changes']);