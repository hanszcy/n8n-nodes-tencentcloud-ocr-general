const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');

gulp.task('build:icons', () => {
	return gulp
		.src('**/*.svg')
		.pipe(
			svgSprite({
				mode: {
					symbol: {
						dest: 'dist',
						sprite: 'sprite.svg',
					},
				},
			}),
		)
		.pipe(gulp.dest('.'));
});
