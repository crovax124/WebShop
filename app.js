const path = require('path');

const express = require('express');

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

app.listen(3000);