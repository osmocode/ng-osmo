
const run = require('gulp-run');

export function execCommand(command: string[], options?: any) {
  return (done: (err?: Error | null) => void) => {
    run(command.join(' '), options).exec((err: Error | null) => {
      done(err);
    });
  }
}
