//routes/usersRoutes

//Use express router and passport modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

//Use User model
var User = require('../models/user.js');

//return register form
router.get('/signup', function(req, res){
    res.render('signup', {data: null}); 
});

//post register form to enroll a new user
//if user is allready enrolled views is render with warning
//else, new user is created and saved in mongodb and greatings view is display
router.post('/signup', function(req, res){
    User.countDocuments({email: req.body.email}, (err, count) => {
        if(err) return err;
        if(count > 0) {
            req.body.loggedin = req.isAuthenticated();
            return res.render('signup', {data: req.body.email});
        } else {
            var user = new User({ nom: req.body.nom, prenom: req.body.prenom, email: req.body.email, password: req.body.pswd});
            user.save();
            req.login(user, function(err) {
                if (err) { throw new Error(err); }
                req.body.loggedin = req.isAuthenticated();
              }); 
        }  
        res.render('greatings', {data: req.body});
    });
});

//return login form
router.get('/login', function(req, res){
    res.render('login', {data: null}); 
});

//post login form to authenticate an existing user
//info.message is define in Passport LocalStrategy in app.js
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(info) {return res.render('login', {data: info.message})};
        if(!user) {return res.render('login')};
        req.logIn(user, (err) => {
            if(err) return next(err);
            req.body.loggedin = req.isAuthenticated();
            req.body.nom = user.nom;
            res.render('greatings', {data: req.body});
        });
    })(req, res, next);
});


// Get logout page destroy session and redirect to index
router.get('/logout', function(req, res, next) {   
    req.logout();
    req.session.destroy(function() {
      res.redirect('/');
  
    }); 
  });

//export router
module.exports = router;