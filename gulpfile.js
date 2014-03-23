var gulp        = require('gulp'),
    browserify  = require('gulp-browserify'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    refresh     = require('gulp-livereload'),
    lr          = require('tiny-lr'),
    server      = lr(),
    prefix      = require('gulp-autoprefixer'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    clean       = require('gulp-clean'),
    mocha       = require('gulp-mocha'),
    jshint      = require('gulp-jshint'),
    imagemin    = require('gulp-imagemin'),
    minifyCSS   = require('gulp-minify-css'),
    embedlr     = require('gulp-embedlr'),
    jstify      = require('jstify');

var browserifyShim = {

  /* --- [ JQUERY & JQUERY UI ] --- */
  jquery: {
    path: './bower_components/jquery/dist/jquery.js',
    exports: '$'
  },

  jqueryUIWidget: {
    path: './bower_components/jquery-ui/ui/jquery.ui.widget.js',
    exports: 'jqueryUIWidget',
    depends: {
      jquery: 'jQuery'
    }
  }

};

gulp.task('clean', function() {
  gulp.src(['public/css', 'public/img', 'public/js'], { read: false })
    .pipe(clean());
});

gulp.task('test', function() {
  gulp.src('test/js/spec/**/*.js')
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('scripts', function() {

  gulp.src(['app/js/main.js'])
    .pipe(plumber())
    .pipe(browserify({
      insertGlobals: true,
      transform : ['jstify'],
      shim: browserifyShim
    }))
      .on('error', notify.onError())
    .pipe(jshint())
      .on('error', notify.onError())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(refresh(server));
});

gulp.task('styles', function() {
  gulp.src(['app/scss/main.scss'])
    .pipe(plumber())
    .pipe(sass())
      .on('error', notify.onError())
    .pipe(prefix("last 1 version", "> 1%", "ie 9"))
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/css'))
    .pipe(refresh(server));
});

// Sinatra is using the server
// gulp.task('lr-server', function() {
//   server.listen(3000, function(err) {
//     if(err) return console.log(err);
//   });
// });

gulp.task('images', function () {
  gulp.src('app/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/img'));
});

gulp.task('html', function() {
  gulp.src("app/*.html")
    .pipe(embedlr())
    .pipe(gulp.dest('public/'))
    .pipe(refresh(server));
});

gulp.task('default', ['clean'], function() {
  gulp.run('scripts', 'styles', 'html');

  gulp.watch('app/js/**/*', function(event) {
    gulp.run('scripts');
  });

  gulp.watch('app/scss/**', function(event) {
    gulp.run('styles');
  });

  gulp.watch('app/**/*.html', function(event) {
    gulp.run('html');
  });

  gulp.watch('app/img/**', function(event) {
    gulp.run('images');
  });
});