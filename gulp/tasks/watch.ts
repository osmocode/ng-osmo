
import { watch } from 'gulp';
import { ngPackagr } from 'ng-packagr';
import { execCommand } from '../utils/command';
import { compileLibSassTask } from './compile';
import { copyLibSassTask } from './copy';

export function watchLib(
  tsconfig: string,
  tsfolder: string,
  bundleHandler: (value: void) => void
) {
  return (done: (err?: Error | null) => void) => {
    ngPackagr()
      .withTsConfig(tsconfig)
      .forProject(tsfolder)
      .watch().forEach((value) => {
        bundleHandler(value);
      })
      .catch((reason) => {
        done(new Error("Process 'ng-packagr' finished with non-zero exit value."));
      })
      .finally(() => {
        done();
      });
  }
}

export function watchDoc() {
  return (done: (err?: Error | null) => void) => {
    execCommand(['ng', 'serve', 'ng-osmo-doc'], { verbosity: 3})(done);
  }
}

export function watchScss() {
  return (done: (err?: Error | null) => void) => {
    watch(['**/*.scss'], () => {
      compileLibSassTask()(done);
      copyLibSassTask()(done);
    });
  }
}
