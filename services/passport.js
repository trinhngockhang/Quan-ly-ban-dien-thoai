const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const userController = require('../Controller/UserController');
const bcrypt = require('bcrypt');
passport.serializeUser((user, done) => {
  console.log('user rrrr ',user.id11);
  done(null, user.id);
});

passport.deserializeUser((_id, done) => {
  User.findById(_id).then(user => {
    done(null, user);
  });
});


passport.use(new LocalStrategy(
  async (username,password,done) => {
    console.log("Aaaaa");
    const data = await userController.findUserByName(username);
    if(data){
      console.log(data);
        bcrypt.compare(password,data.password,(err,res) => {
          if(res){
            console.log(res);
            return done(null,data);
          }else{
            console.log("sai p");
            return done(null,false);
          }
        })
      }else{
        return done(null,false);
      }
  }
))
