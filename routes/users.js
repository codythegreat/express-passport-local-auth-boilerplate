const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

// User Model
const User = require('../models/Users');

router.get('/login', (req, res) => res.render('login'));

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_message', 'You have logged out');
    res.redirect('/login');
});

router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
    let errors = [];

    // pull form variables from request body
    const { fname, lname, email, password, password2 } = req.body; 
    

    // if field is missing, add error message
    if (!fname || !lname || !email || !password || !password2) {
        errors.push({ message: "please fill in all required fields"});
    }

    // if passwords don't match, add error message
    if (password !== password2) {
        errors.push({ message: "passwords do not match"});
    }

    // if passwords < 8 chars, add error message
    if (password.length < 8) {
        errors.push({ message: "password must be at least 8 characters long"});
    }

    if (errors.length > 0) {
        // rerended the register page with error messages and prev form data
        res.render('register', {
            errors,
            fname,
            lname,
            email,
            password,
            password2
        });
    } else {
        // check to make sure user doesn't already exist
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // add err message for email in use
                    errors.push( { message: "email is already registered"});
                    // rerender the form
                    res.render('register', {
                        errors,
                        fname,
                        lname,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        fname,
                        lname,
                        email,
                        password
                    })

                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // set password to hash
                            newUser.password = hash;
                            // save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_message', `Welcome ${fname}! You have been registered!`)
                                    res.redirect('/login');
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,

    })(req, res, next);
})

module.exports = router;