# VendingMachineDemoApp

### Usage instructions
- Make sure node.js is installed on your machine.
- For running use `mvn clean install` on 'parent' project. This will install node modules and emit bundle.
- Then proceed with `mvn clean install` on 'fe' following with `java -jar ./target/bl-0.0.1-SNAPSHOT.jar` on 'bl' project, if working from command line, if using Idea (or other IDE), simply set up spring boot running config.
- Page is now accessible  by url "http://localhost:8090/index.html".

### About
The app is devided into two modules: **frontend (fe)** and **business logic (bl)**, **parent** is only a helper for packaging. All required dependencies must be collected via **npm**.
- Frontend is bundled using Webpack and Maven plugin to init Webpack bundling and uglify bundle. So the whole output of 'fe' project is single minified `app-bundle.js` file. 
- Backend is based on Java Spring Boot.

Both 'fe' and 'bl' projects contains tests. 
For 'bl' tests use Spring Boot testing configuration, for 'fe' testing use `npm test`.
