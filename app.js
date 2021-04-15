//app.js
//main program for authentication use

//.env is used to regroup container URLs, Ports and secrets
require('dotenv/config');

//well known express framework
const express = require('express');
const app = express();

//generate session cookie for user authentication
const session = require('express-session');

//well known Redis memcash database for session store
const redis = require('redis');
const redisStore = require('connect-redis')(session);

//passport require this type of unique identifier
const { v4: uuidv4 } = require('uuid');

//bodyparser scan inURL queries
const bodyParser = require('body-parser');

//ejs is the render engine used in this project
app.set('view engine', 'ejs');

//tell express where are stored css files
app.use('/css', express.static('css'));

//tell express to use url queries
app.use(bodyParser.urlencoded({ extended: false }));

// import necessary Passport modules for local authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Set up a client for Redis session store
const redisClient = redis.createClient({
  host: process.env.DB_SESSION_URL,
  port: process.env.DB_SESSION_PORT
});

// catch Redis error and do something
redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

// Express session middleware, connect to session store and create session cookie
app.use(session({
    genid: () => {
      return uuidv4()
    },
    store: new redisStore({
        host: process.env.DB_SESSION_URL,
        port: process.env.DB_SESSION_PORT,
        client: redisClient
    }),
    secret: process.env.SESSION_SECRET,
    name: '_nodeappSession', //cookie name
    resave: false,
    cookie: { secure: false },
    saveUninitialized: true
  }));	

// Pass the user id to the passport middleware
//serialize function set user id into session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Reading your user base on the user.id
//deserialize function get user id from the session
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null, user.public());
    });
});

//create model with mongoose and mongodb, see user.js file
var User = require('./models/user.js');

//authenticate a user with Passport and return public part of his data
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pswd'
    },
    (email, pswd, done) => {
      User.find({email: email.toLowerCase()}, (err, users) => {
        // Was a user found?
        if (users.length) {
          // Attempt authenticating with the supplied password
          if (users[0].authenticate(pswd)) {
            done(null, users[0].public());
          }
          
          // Supplied password incorrect, send info.message
          else {
              return done(null, false, { message: 'Mot de passe incorrect' });
          }
        }
        
        // No user was found, send info.message
        else {
            return done(null, false, { message: 'Email incorrect ou inexistant' });
        }
      });
  }));

//initialize passport in express
app.use(passport.initialize());
app.use(passport.session());

//import routes, see usersRoutes.js to see how passport authenticates and registers users
const usersRoute = require('./routes/usersRoutes');
app.use('/users', usersRoute);

//Root of this app
app.get('/', function(req, res){
    res.render('index');
});

//Port listening is forwarding by docker in docker-compose.yaml
app.listen(9000);