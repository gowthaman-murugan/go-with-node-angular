# go-with-node-angular
Simple Web application with 1.angularjs 2.nodejs 3.express  4.passport authentication 5.gulp
This helps to provide an idea about an web application using modern framworks.

// test by arun

##Prerequisite Technologies
* Node.js - [Download]() and Install Node.js
* MongoDB - [Download]() and Install mongodb

##Prerequisite packages
* glup 
  ``` $ npm install -g gulp```
* bower
  ``` $ npm install -g bower```
  
##Set up
Please run the below commands to get the dependencies 
```
   npm install
   bower install
```

##Running the application
To run in development node 
```
   npm start
```
For production mode
```
   export NODE_ENV = production
   gulp
   npm start
```

##Directory Structure
```
  -- app.js
  |-- bin
  |   `-- www.js
  |-- bower.json
  |-- config
  |   |-- assets.json
  |   |-- authorization.js
  |   |-- config.js
  |   |-- env
  |   |   |-- development.js
  |   |   `-- production.js
  |   `-- passport.js
  |-- gulpfile.js
  |-- package.json
  |-- public
  |   |-- css
  |   |-- images
  |   |-- js
  |   |   |-- core
  |   |   |   |-- controllers
  |   |   |   |-- directives
  |   |   |   `-- services
  |   |   `-- lib
  |   `-- views
  |       |-- includes
  |       |-- index.html
  |       `-- partials
  `-- server
     |-- controllers
     |-- models
     `-- routes
```
…