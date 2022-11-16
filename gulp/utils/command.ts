
const run = require('gulp-run');

export function execCommand(command: string, options?: any) {
  return (done: (err?: Error | null) => void) => {
    run(command, options).exec((err: Error | null) => {
      done(err);
    });
  }
}
