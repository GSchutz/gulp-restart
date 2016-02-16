# Usage

```javascript

var gulp = require('gulp');
var gulp-restart = require('gulp-restart');


gulp.task('watch', function() {

  var restart = require('gulp-restart');

  // will restart the entire gulp on every file change
  gulp.watch(['src/**/*'], restart);

});

```

That's it.
