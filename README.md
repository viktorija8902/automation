# Automation

This project is a result of my experiments with Gulp.

**Tasks in gulpfile.js include:**

* live editing (.scss, .html, .js files)
* code correction with ESlint
* converting ES6 to JS
* JS concatenation and minification
* converting SCSS to compressed CSS
* automatically adding vendor prefixes in CSS and removing unnecessary
* reducing the size of images (.png and .jpg)
* sourcemaps
* running tests

Tasks for production and development are separate.

**All required plugins are in package.json and package-lock.json files.**


*This project (especially gulpfile.js, package.json and package-lock.json files) can be used 
as a template for the future projects. 
It was made while watching ["Web tooling & automation" course](https://www.udacity.com/course/web-tooling-automation--ud892) in Udacity.com.*

### Instructions how to run the project

1. Clone the repository
2. Download and install NodeJS and npm from [NodeJS website](https://nodejs.org/en/)
3. Install project packages by running:

    ```npm install```   
4. Install gulp:

    ```npm install gulp-cli -g```
5. Usage:
  * run ```gulp``` for development. Try changing the code (index.html, .scss) and see changes automatically appearing in the browser and in /dist folder.
  * run ```gulp dist``` for production and see production files appearing in /dist folder.
  * run ```gulp tests``` to run tests.
