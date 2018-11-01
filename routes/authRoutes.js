const passport = require('passport');
const userController = require('../Controller/UserController');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {


  app.get("/admin",(req,res) =>{
    res.send("ban da login");
  })



  app.get("/login",(req,res) =>{
    console.log("vao");
    res.render('Login');
  })

  app.get("/logout",(req,res) => {
    req.logout();
    res.redirect('/');
  })

  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/',
                                     successRedirect:'/'}),
    function(req, res) {
      res.redirect('/');
    });


  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


};
