const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,(err) =>{
  console.log("connect ss");
});
app.set("view engine","ejs");
app.set("vỉews","./views");
app.use(express.static(__dirname + '/public'));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/billRoutes')(app);
require('./routes/userRoutes')(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
    next();
});

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
