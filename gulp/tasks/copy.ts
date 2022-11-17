
import { src, dest } from 'gulp';

export function copyLibSassTask() {
  return (done: (err?: Error | null) => void) => {
    src('components/**/styles/**.scss')
      .pipe(dest('publish/'));

    src('components/ng-osmo*.scss')
      .pipe(dest('publish/'));
    done();
  }
}
