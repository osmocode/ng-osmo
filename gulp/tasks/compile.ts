
import { src, dest } from 'gulp';

const sass = require('gulp-sass')(require('sass'));
const minCss = require('gulp-minify-css');
const rename = require('gulp-rename');

export function compileLibSassTask() {
  return (done: (err?: Error | null) => void) => {
    src('components/**/styles/index.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('publish/'));

    src('components/ng-osmo*.scss')
      // output non-minified CSS files
      .pipe(sass({
        outputStyle : 'expanded'
      }).on('error', sass.logError))
      .pipe(dest('publish/'))
      // output minified CSS files
      .pipe(minCss())
      .pipe(rename({ extname: '.min.css' }))
      .pipe(dest('publish/'))

    done();
  }
}
