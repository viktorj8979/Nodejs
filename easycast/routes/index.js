var express = require('express');
var subdomain = require('express-subdomain');
var router = express.Router();
var router1 = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

module.exports = function(app, passport){

	/* GET login page. */
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('account/signin', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('account/signup',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/', isAuthenticated, function(req, res){
		res.render('index', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

    /* Handle Create Account POST */
    router.post('/create_account', function (req, res) {
        var email = req.body.email,
            company = req.body.company;

        console.log('Created domain with company name %s', company);

        router.use(subdomain(company, router1));

        app.use(subdomain('easycast.io', router));

        res.redirect('/signup');
    });

    /* Create Account Page */
    router.get('/create_account', function (req, res) {
        res.render('account/create_account');
    });

	return router;
}





