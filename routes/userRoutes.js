const passport = require('passport');
const userController = require('../Controller/UserController');
const requireLogin = require('../middlewares/requireLogin');
const User = require('../models/User');

module.exports = app => {

  app.post("/api/createUser",(req,res) => {
    userController.createUser(req,res);
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get("/api/countUser",async (req,res) => {
      var count = await User.countDocuments();
      res.send("" + count);
  })
};
