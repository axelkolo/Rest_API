require("dotenv").config();
require("./Database/database").connect();
const express = require('express');
var morgan = require('morgan')
const bodyParser = require('body-parser');
//const UserModel = require('./Models/user');
const routes = require('./Routes/routes');


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', routes);

module.exports=app;