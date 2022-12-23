import { task, parallel, series, watch } from 'gulp';

/*
  Import custom tasks
*/
import { helpTask } from './tasks/help';
import { compileLibSassTask } from './tasks/compile';
import { copyLibSassTask } from './tasks/copy';
import { buildLib } from './tasks/build';
import { watchLib, watchDoc, watchScss } from './tasks/watch';

const tsconfig = 'components/tsconfig.lib.json';
const tsfolder = 'components';

task('style:copy', copyLibSassTask());

task('style:compile', compileLibSassTask());

task('build:scss', parallel(['style:copy', 'style:compile']));

task('build:lib', buildLib(tsconfig, tsfolder));

task('help', helpTask());

task('default', parallel('help'));

task('start:dev', done => {
  var initLib = false;
  watchLib(tsconfig, tsfolder, (value) => {
    if (initLib === false) {
      //parallel(['style:copy', 'style:compile'])(done);
      //watchScss()(done);
      watchDoc()(done);
      initLib = true;
    }
  })(done);
});

