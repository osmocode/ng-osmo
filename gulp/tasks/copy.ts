
import { src, dest, lastRun } from 'gulp';

export function copyLibSassTask() {
  return (done: (err?: Error | null) => void) => {
    src('components/**/styles/**.scss', {since: lastRun(copyLibSassTask())})
      .pipe(dest('publish/'));

    src('components/ng-osmo*.scss', {since: lastRun(copyLibSassTask())})
      .pipe(dest('publish/'));
    done();
  }
}
