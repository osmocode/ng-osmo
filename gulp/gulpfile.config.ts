import { task, parallel, dest, series } from 'gulp';
const run = require('gulp-run');

/*
  Import custom tasks
*/
import { helpTask } from './tasks/help';
import { execCommand } from './utils/command';

task('build:lib', execCommand('ng build ng-osmo-lib'));

task('help', helpTask());

task('default', parallel('help'));
