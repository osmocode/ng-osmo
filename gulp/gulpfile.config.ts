


import { task, parallel } from 'gulp';

/*
  Import custom tasks
*/
import { helpTask } from './tasks/help';


task('help', helpTask());

task('default', parallel('help'));
