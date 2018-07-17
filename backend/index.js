// Libraries 
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const cons = require('consolidate');

// Router
const mainRouter = require('./routes/mainRoutes')();

//
const app = express();
const port = process.env.PORT || 5000;
const mongoURL = 'mongodb://localhost:27017/kantasnet';

app.use('/api/files', express.static(__dirname + '/files'));
app.engine('html', cons.ejs); // assign the ejs engine to .html files
app.set('view engine', 'html'); // set .html as the default extension
app.set('views', __dirname + '/views');

//Assign routes
app.use('/api', mainRouter);


app.listen(port, () => { console.log(`Server listen on port ${port}`) });