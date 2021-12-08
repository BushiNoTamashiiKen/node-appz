/*--- Gulp Tasks for app builds ---*/

'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    minify = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

// Set up global paths objects
var paths = {

	root: 'app',
	scss: 'app/scss/*.scss',
	css: 'app/css/*.css',
	views: 'app/*.html',
	js: 'app/js/*.js',
	output: './dist'
};
var viewGlobs = ['app/scss/*.scss', 'app/*.html'];
var imageGlobs = ['app/images/*.jpg', 'app/images/*.png'];

// App server task
gulp.task('launch-app', () => {

	browserSync.init({

		server: 'app'
	});

	// Live reload watcher
	//gulp.watch(viewGlobs, ['sassify']).on('change', browserSync.reload);
	gulp.watch('app/scss/*.scss', ['sassify']);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

// Watcher task
gulp.task('watchman', ['sassify'], () => {

	gulp.watch(paths.scss, ['sassify']);
});

// Compile Scss files
gulp.task('sassify', () => {

	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest('app/css'));
});

// Minify css files
gulp.task('crunchcss', () => {

	gulp.src(paths.css)
		.pipe(minify({debug: true}, (details) => {

			console.log(details.name + ': ' + details.stats.originalSize);
			console.log(details.name + ': ' + details.stats.minifiedSize);
		}))
		.pipe(gulp.dest(paths.output))
});

// Rename dist Files
gulp.task('rename', ['crunchcss'], () => {

	gulp.src(paths.css)
		.pipe(rename((path) => {

			path.dirname += '/renamed';
			path.basename += '';
			path.extname = '.min.css';
		}))
		.pipe(gulp.dest('renamed'))
});

// Optimize images
gulp.task('imagemin', () => {

	gulp.src(imageGlobs)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.output))
});
	
// Concatinate JS files
gulp.task('concat', () => {

	gulp.src(paths.js)
		.pipe(concat())
		.pipe(gulp.dest())
});

// Gulp BrowserSync Server
/*gulp.task('launch', function(){

	browserSync.init({

		server: '/app'
	});

	// Generic watcher tasks
	gulp.watch('app/scss/*.scss', ['sassify']);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

// Compile Scss files
gulp.task('sassify', function(){

	return gulp.src('app/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'));
});
// 	Generic file watcher
/*gulp.task('watchman', function(){
});*/

// Watcher for scss files
/*gulp.task('watchsass', function(){

	gulp.watch(paths.scss, ['sassify']);			
});

// Minify compiled files
gulp.task('crunch', function(){

	return gulp.src(paths.output)
		.pipe(minify({debug: true}, function(details){

			console.log(details.name + ': ' + details.stats.originalFilesize);
			console.log(details.name + ': ' + details.stats.modifiedFilesize);
		}))
		.pipe(gulp.dest('dist'));
});


// Compile sass files
gulp.task('sassify', function(){

	return gulp.src(paths.scss)
	.pipe(sass()); 
	.pipe(gulp.dest(paths.output));
});*/



// Include Gulp
/*var gulp = require('gulp')
, sass = require('gulp-sass')
, rename = require('gulp-rename');


// Define global source file path object
var paths = {

	scss: 'app/scss/*.scss'
};

// Run task
gulp.task('sassify', function(err){

	// Define source
	return gulp.src(paths.scss)
		.pipe(sass()) // Run file through sass pipe
		.pipe(gulp.dest('public/css'));
});*/

// File renaming task
/*gulp.task('rename', function(){

	// Define source
	return gulp.src('app/css/*.css')
		.pipe(rename(function(path){

			path.dirname += 'app/css';
			path.basename += '-minified';
			path.extname = '.min.css';
		}))
		.pipe(gulp.dest('public'))
});

// Watcher task using browserSync to reload
/*gulp.task('watchman', ['sassify'], function(){

	gulp.watch('', ['sassify']);
})

/*var gulp = require('gulp');

// include necessary plugins
var sass = require('gulp-sass')
,cleanCSS = require('gulp-clean-css')
,rename = require('gulp-rename')
,gutil = require('gulp-util')
,ftp = require('vinyl-ftp')
,browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve-me', ['sass-me'], function(){

	// Initialise BrowserSync
	browserSync.init({

		server: "./app"
	});

	// Set up watchers
	gulp.watch('app/scss/*.scss', ['sass-me']);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

// Sass-me
gulp.task('sass-me', function(){

	return gulp.src('app/scss/*.scss')
		.pipe(sourcemap.init())
		.pipe(sass()) // Switch on sass pipe
		.pipe(sourcemap.write())
		.pipe(gulp.dest('app/css'));
});

// Set default gulp job (start up BrowserSync server)
gulp.task('default', ['serve']);

// Sass compile
gulp.task('sass', function(){

	return gulp.src('app/scss/*.scss')
		.pipe(sass()) // Switch sass plugin on
		.pipe(cleanCSS({compatibility: "ie8"}))
		.pipe(rename(function(path){ // Rename css file after minification

			path.dirname += "";
			path.basename += ".min";
			path.extname = ".css"
		}))
		.pipe(gulp.dest('app/css')) // Set output folder
		.pipe(browserSync.stream());
});

// Generic watcher job
gulp.task('watch', ['sass'], function(){

	browserSync.init({
        server: "./app"
    });

	// Watch tasks
	gulp.watch('app/scss/*.scss', ['sass']);
	gulp.watch('app/*.html').on('change',browserSync.reload);
});*

// CSS Minifier job
// Runs rename method after minification
gulp.task('minify-css', function(){

	return gulp.src('web-build/dist/css/*.css')
		.pipe(minify({compatibility: 'ie8'}, {debug: true}, function(details){

			console.log(details.name + ': ' + details.stats.originalFilesize);
			console.log(details.name + ': ' + details.stats.minifiedFilesize);
		}))
		.pipe(rename(function(path){

			path.dirname += "";
			path.basename += ".min";
			path.extname = ".css"
		}))
		.pipe(gulp.dest('test'));
});

// Rename files job
gulp.task('rename', function(){	
	return gulp.src('web-build/dist/css/*.css')
		.pipe(rename(function(path){

			path.dirname += "";
			path.basename += "min";
			path.extname = ".css"
		}))
		.pipe(gulp.dest('test'));
	gulp.watch('web-build/dist/css/*.css', ['rename']);
});

// Gulp FTP Deploy Job
gulp.task('deploy', function(){

	// Configure ftp connection
	var conn = ftp.create({

		host: 	  'ftp181.heteml.jp',
		user:     'caracri_web',
		password: 'caracri6631c',
		parallel: 10,
		log:      gutil.log
	});

	// Define global directory/file upload types
	var globs = [

		'app/src/**',
		'app/css/**',
		'app/js/**',
		'app/fonts/**',
		'app/images/**',
		'app/index.html'
	];

	// Run Gulp job
	return gulp.src(globs, { base: '.', buffer: false } )
		.pipe( conn.newer( '/designsample/minamiaso/bin') ) // Only upload newer files
		.pipe( conn.dest( '/designsample/minamiaso/bin' ) );
});

// Gulp FTP Delete files job
/*gulp.task('remove', function(){

	// Create ftp config
	var conn = ftp.create({

		host:       'ftp181.heteml.jp',
		user:       'caracri_web',
		password:   'caracri6631c',
		parallel:   10,
		log:        gutil.log
	});

	// Define Globals
	var globs = [

		'app/src/**',
		'app/css/**',
		'app/js/**',
		'app/fonts/**',
		'app/images/**',
		'app/index.html'
	];

	// Set target source
	return gulp.src( globs, { base: '.', buffer: false } )
		.pipe( conn.rmdir( '/designsample/minamiaso/bin' ) )
		.pipe( conn.dest( '/designsample/minamiaso/bin') )
	}
});*/


