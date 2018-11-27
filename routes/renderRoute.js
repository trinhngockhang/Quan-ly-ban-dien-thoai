const passport = require('passport');
const userController = require('../Controller/UserController');
const requireLogin = require('../middlewares/requireLogin');
const requireBoss = require('../middlewares/requireBoss');

module.exports = app => {
  app.get("/",requireLogin,(req,res) => {
    console.log(req.session);
    res.render('home');
  })

  app.get("/form",requireLogin,(req,res) => {
    res.render('form');
  })

  app.get("/form-user",requireBoss,(req,res) => {
    res.render('form-user');
  })

  app.get("/form-bill",requireLogin,(req,res) => {
    res.render('form-bill');
  })

  app.get("/form-bill-out",requireLogin,(req,res) => {
    res.render('form-out');
  })

  app.get("/update-user",requireLogin,(req,res) => {
    res.render('update-user');
  })

  app.get("/update-product",requireLogin,(req,res) => {
    res.render('product-update');
  })

  app.get("/notAuth",requireLogin,(req,res) => {
    res.render('notAuth');
  })

  app.get("/bill-table",requireLogin,(req,res) => {
    res.render('bill-table');
  })

  app.get("/user-table",requireLogin,(req,res) => {
    res.render('user-table');
  })

  app.get("/product-table",requireLogin,(req,res) => {
    res.render('product-table');
  })

  app.get("/bill-table-out",requireLogin,(req,res) => {
    res.render('bill-table-out');
  })

  app.get("/client-table",requireLogin,(req,res) => {
    res.render('client-table');
  })

  app.get("/producer-table",requireLogin,(req,res) => {
    res.render('producer-table');
  })
};
