
import { ngPackagr } from 'ng-packagr';

export function buildLib(
  tsconfig: string,
  tsfolder: string
) {
  return (done: (err?: Error | null) => void) => {
    ngPackagr()
      .withTsConfig(tsconfig)
      .forProject(tsfolder)
      .build().then((value) => {
        done();
      }, (reason) => {
        done(new Error("Process 'ng-packagr' finished with non-zero exit value."));
      });
  }
}
