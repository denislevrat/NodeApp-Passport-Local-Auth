// models/user.js

//.env store mongodb URL
require('dotenv/config');

//Use mongoose to talk to mongodb
const mongoose = require('mongoose');

//Use bcrypt to encrypt and decrypt passwords
var bcrypt = require('bcrypt');

//Connect mongoose to mongodb
mongoose.connect(process.env.DB_CONNECTION_USER, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(console.log('connected to db'))
  .catch(error => {console.log(error)});

//mongoose schema shortcut
var Schema = mongoose.Schema;

//Create the user model with typed data collected
const User = new Schema({
  nom: {type: String},
  prenom: {type: String},
  email: {type: String},
  password: {type: String},
  hash: {type: String},
  attempts: {type: Number, default: 0}
});

//erase clear password and lower case email before call save
User.pre('save', function(next) {
  this.email = this.email.toLowerCase();
  var password = this.password || '';
  this.password = undefined;
  if (!this.hash){
    this.hash = bcrypt.hashSync(password, 10);
  }
  return next();
});

//don't return clear hash to browser
User.method('public', function(){
  this.hash = undefined;
  return this;
});

//compare stored hash to submit password and limit number of attempts
//Warning, attempts logic is not implemented in views -> todo
User.method('authenticate', function(password){
  if(bcrypt.compareSync(password, this.hash) && this.attempts < 10){
    this.attempts = 0;
    return this;
  } else {
    this.attempts++;
    this.save();
    return false;
  }
});

//export User model
module.exports = mongoose.model('User', User); 
 