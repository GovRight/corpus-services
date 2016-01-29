var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var spawn = require('child_process').spawn;
var chalk = require('chalk');

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

gulp.task('docs-html', function() {
  var git = spawn('git', ['branch']), output = '';
  git.stdout.on('data', function(data) {
    output += data;
  });
  git.on('close', function() {
    if(output.indexOf('* gh-pages') < 0) {
      console.log(chalk.red('\n\nYou must use `gh-pages` branch for html documentation.\n\n'));
      process.exit();
    }
    return gulp.src([
      './dist/govright-corpus-services.js'
      ]).pipe($.ngdocs.process({
        html5Mode: false,
        title: 'GovRight Corpus Services'
      }))
      .pipe(gulp.dest('./'));
  });
});

gulp.task('docs', ['docs-html'/*, 'docs-md'*/]);

gulp.task('default', ['js']);
