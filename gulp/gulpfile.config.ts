import { task, parallel, series } from 'gulp';

/*
  Import custom tasks
*/
import { helpTask } from './tasks/help';
import { compileLibSassTask } from './tasks/compile';
import { copyLibSassTask } from './tasks/copy';
import { buildLib } from './tasks/build';
import { watchLib, watchDoc } from './tasks/watch';

const tsconfig = 'components/tsconfig.lib.json';
const tsfolder = 'components';

task('build:scss', parallel([copyLibSassTask(), compileLibSassTask()]));

task('build:lib', buildLib(tsconfig, tsfolder));

task('help', helpTask());

task('default', parallel('help'));

task('start:dev', done => {
  var initLib = false;
  watchLib(tsconfig, tsfolder, (value) => {
    if (initLib === false) {
      watchDoc()(done);
      initLib = true;
    }
  })(done);
});

