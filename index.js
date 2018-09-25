const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const app = express();
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,(err) =>{
  console.log("connect ss");
});

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
