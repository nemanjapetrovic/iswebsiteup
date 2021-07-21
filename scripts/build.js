const ncp = require('ncp').ncp;
const fs = require('fs');
const gulp = require('gulp');
const version = require('gulp-version-number');

console.log('BUILD START');

if (fs.existsSync('./www')) {
  fs.rmdirSync('./www', { recursive: true });
}

fs.mkdirSync('./www');

ncp('./src', './www', function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Done coping of src folder!');
  console.log('BUILD DONE');

  console.log('START Versioning JS/CSS');

  const versionConfig = {
    value: '%MDS%',
    append: {
      key: 'v',
      to: ['css', 'js']
    }
  };

  gulp.src('www/**/*.ejs')
    .pipe(version(versionConfig))
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));

  console.log('END Versioning JS/CSS');
});
