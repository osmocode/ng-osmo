// https://stackoverflow.com/questions/39580722/how-do-you-write-gulp-tasks-in-typescript
// Load gulp task from Typescript

const path = require('path');

const root = __dirname;
const tsconfig = path.join(root, './gulp/tsconfig.json');


require('ts-node').register({
  project: tsconfig
});

require('./gulp/gulpfile.config');
