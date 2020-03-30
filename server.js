const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Reads our .env file for environmental vars
require('dotenv').config();

// passport config
require('./config/passport')(passport);

// Get Mongo URI key
const db = process.env.MONGO_URI;

// Connect to Mongo DB
mongoose.connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(console.log("Mongo DB Connected..."))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

// initialize express app
const app = express();

// set up handlebars views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// register handlebars partials
hbs.registerPartials(__dirname + '/views/partials');

// Bodyparser middleware (get data from form with req.body)
app.use(express.urlencoded({ extended: false }));

// express session middleware
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect-flash middleware
app.use(flash());

// global vars for flash
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    next();
})

// set up static files
app.use(express.static(__dirname + '/public'));

// routing
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));

// have app listen and serve on PORT
app.listen(PORT, console.log(`Listening on port ${PORT}`));