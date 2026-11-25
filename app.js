const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

//route
const routes = require('./routes');

//use
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());

//set template engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main.layout.ejs');


//router endpoin
app.use('/', routes);

//import handler
const notFoundMiddleware = require("./middlewares/not-found.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

//middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);


module.exports = app;
