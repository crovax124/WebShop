const path = require('path');

const express = require('express');

const db = require('./data/database')
// const session = require('express-session');
// const csrf = require('csurf');

const authRoutes = require('./routes/auth_routes');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// app.use(csrf());

app.use(authRoutes);

db.connectToDataBase().then(function() {
    app.listen(3000);
}).catch(function (error) {
    console.log('Failed to connect to Database');
    console.log(error);
});

