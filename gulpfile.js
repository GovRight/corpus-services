var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('js', function() {
  return gulp.src([
    './src/*.js'
  ]).pipe($.concat('govright-corpus-services.js'))
    .pipe($.replace('lbServices.', 'govright.corpusServices'))
    .pipe($.replace('govrightCorpusServices', 'govright.corpusServices'))
    .pipe(gulp.dest('./dist'))
    .pipe($.uglify())
    .pipe($.rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('docs-html', function () {
  return $.ngdocs.sections({
    api: {
      glob: ['./dist/govright-corpus-services.js'],
      api: true,
      title: 'API Reference'
    }
  }).pipe($.ngdocs.process({
    startPage: '/api/govright.corpusServices',
    html5Mode: false,
    title: 'GovRight Corpus Services',
    styles: [
      'ngdocs_assets/govright-docs.css',
      'bower_components/gulp-ngdocs-supplemental/dist/style.css'
    ],
    navTemplate: './ngdocs_assets/navbar.html'
  }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('serve', ['docs'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['./docs']
    }
  });
  gulp.watch([
    './dist/govright-corpus-services.js',
    './docs/partials/**/*',
    './docs/css/**/*'
  ]).on('change', reload);
  gulp.watch([
    './dist/govright-corpus-services.js',
    './ngdocs_assets/**/*'
  ], ['docs']);
  gulp.watch([
    './src/**/*.js'
  ], ['js']);
});

gulp.task('docs', ['docs-html'/*, 'docs-md'*/]);

gulp.task('default', ['js'], function() {
  return gulp.start('docs');
});
