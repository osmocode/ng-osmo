import { task, parallel } from 'gulp';

/*
  Import custom tasks
*/
import { helpTask } from './tasks/help';
import { compileLibSassTask } from './tasks/compile';
import { copyLibSassTask } from './tasks/copy';
import { execCommand } from './utils/command';


task('build:scss', parallel([copyLibSassTask(), compileLibSassTask()]));

task('build:lib', execCommand(['ng', 'build', 'ng-osmo-lib']));

task('help', helpTask());

task('default', parallel('help'));
