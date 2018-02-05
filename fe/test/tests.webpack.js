import 'angular';
import 'angular-mocks/angular-mocks';

// running all *.spec.js files.
const context = require.context('../app', true, /\.spec.js$/);

context.keys().forEach(context);