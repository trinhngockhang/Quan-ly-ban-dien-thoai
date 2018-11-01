const passport = require('passport');
const userController = require('../Controller/UserController');
const requireLogin = require('../middlewares/requireLogin');
const requireBoss = require('../middlewares/requireBoss');

module.exports = app => {
  app.get("/",requireLogin,(req,res) => {
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
};
