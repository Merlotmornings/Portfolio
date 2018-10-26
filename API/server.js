var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mssql = require('mssql'),
    Task = require('./api/models/testModel'), //created model loading here
    bodyParser = require('body-parser');

// mssql instance connection url connection
mssql.Promise = global.Promise;
var config = {
    user: 'sa',
    password: 'mypassword',
    server: 'localhost',
    database: 'SchoolDB'
};
mssql.connect(config);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/testRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);