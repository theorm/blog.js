var express = require('express')
  , Blog = require('../lib/blog').Blog;


var app = express();
app.use(app.router);

var blog = new Blog(app);

var defaultPort = 3001;
app.listen(defaultPort);
console.log('Listening on port %s', defaultPort);