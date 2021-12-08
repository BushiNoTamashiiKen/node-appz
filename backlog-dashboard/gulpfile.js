/*--- Gulp File Web Tasks ---
/*--- Author: Thabo Mbuyisa
/*--- Project: General use
/*--- Last Modified: 15:17 */

'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    minify = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    ftp = require('vinyl-ftp'),
    browserSync = require('browser-sync').create();

// Set up global paths objects
const paths = {

	root: 'dist',
	scss: 'sass/*.scss',
	views: 'dist/*.html',
	js: 'websites/Nulab/app/dist/js/*.js',
	css: 'dist/css/*.css',
	outputImages: 'websites/Nulab/app/dist/img/crunched',
	outputStyle: 'websites/Nulab/app/dist/css',
	outputRoot: 'websites/Nulab/app/dist/test'
};
var globs = ['websites/Nulab/app/sass/*.scss', 'websites/Nulab/app/dist/*.html'];
var imageGlobs = ['websites/Nulab/app/dist/img/*.jpg'];


// Set up browserSync live server
gulp.task('launch-app', () => {

	browserSync.init({

		server: paths.root
	});

	// Set up watchers
	gulp.watch(globs, ['sassify']).on('change', browserSync.reload);
});

// Watcher task (SCSS + JS files)
gulp.task('watchman', ['JSify'], function(){

	gulp.watch(paths.js, ['JSify']);
});
gulp.task('watchman', ['sassify'], function(){

	gulp.watch(paths.scss, []);
});


// Minify and rename css files
gulp.task('crunchstyles', () => {

	return gulp.src(paths.css)
		.pipe(minify({debug: true}, function(details){

			console.log(details.name + ': ' + details.stats.originalSize);
			console.log(details.name + ': ' + details.stats.minifiedSize);
			console.log('CSS Files minified successfully!');
		}))
		.pipe(rename((path) => {
			path.dirname += '/crunched';
			path.basename += '';
			path.extname = '.min.css'
		}))
		.pipe(gulp.dest(paths.outputStyle))
});

// Rename dist Files
gulp.task('rename', () => {

	return gulp.src(paths.css)
		.pipe(rename((path) => {
			path.dirname += '/renamed';
			path.basename += '-minified';
			path.extname = '.min.css'
		}))
		.pipe(gulp.dest('./dist'))
});

// Optimize images
gulp.task('imagemin', () => {

	gulp.src(imageGlobs)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.outputImages))
});

// Compile scss files
gulp.task('sassify', () => {

	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(paths.outputStyle))
});
	
// Concatinate JS files
gulp.task('concat', () => {

	gulp.src(paths.js)
		.pipe(concat())
		.pipe(gulp.dest())
});


/**
 *
 *
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

	return gulp.src('web/dist/css/*.css')
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
	return gulp.src('web/dist/css/*.css')
		.pipe(rename(function(path){

			path.dirname += "";
			path.basename += "min";
			path.extname = ".css"
		}))
		.pipe(gulp.dest('test'));
	gulp.watch('web/dist/css/*.css', ['rename']);
});*/

// Gulp FTP Deploy Job for NULAB Dashboard
gulp.task('deploy', function(){

	// Configure ftp connection
	var conn = ftp.create({

		host: 	  '13.113.48.188',
		user:     'asruser',
		password: 'EsCCT5zJF9Bs',
		parallel: 10,
		log:      gutil.log
	});

	// Define global directory/file upload types
	var globs = [

		'websites/Nulab/app/dist/src/**',
		'websites/Nulab/app/dist/css/**',
		'websites/Nulab/app/dist/js/**',
		'websites/Nulab/app/dist/fonts/**',
		'websites/Nulab/app/dist/images/**',
		'websites/Nulab/app/dist/index.html'
	];

	// Run Gulp job
	return gulp.src(globs, { base: '.', buffer: false } )
		.pipe( conn.newer( '/test_dir') ) // Only upload newer files
		.pipe( conn.dest( '/test_dir' ) );
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




