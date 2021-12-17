const path = require('path');

const express = require('express');

const db = require('./data/database')
const expressSession = require('express-session');
const createSessionConfig = require('./config/session');

const addCrsfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const csrf = require('csurf');                                                                  // authentitication

const authRoutes = require('./routes/auth_routes');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));

app.use(csrf());
app.use(addCrsfTokenMiddleware);
app.use(errorHandlerMiddleware);
app.use(authRoutes);

db.connectToDataBase().then(function() {
    app.listen(3000);
}).catch(function (error) {
    console.log('Failed to connect to Database');
    console.log(error);
});

