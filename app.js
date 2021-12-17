const path = require('path');

const express = require('express');

const db = require('./data/database')
const session = require('express-session');
const sessionConfig = require('./config/session');

const addCrsfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const mongoDbSessionStore = sessionConfig.createSessionStore(session);

const csrf = require('csurf');                                                                  // authentitication

const authRoutes = require('./routes/auth_routes');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session(sessionConfig.createSessionConfig(mongoDbSessionStore)));

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

