
import { yellow } from 'chalk';

export function helpTask() {
  return (done: (err?: Error | null) => void) => {
    console.log();
    console.log('Gulp task usage:');
    console.log();
    console.log(yellow('clean        '), 'Clean workspace');
    console.log(yellow('build:lib    '), 'Build ng-osmo-lib to /publish directory.');
    console.log();
    done();
  }
}
