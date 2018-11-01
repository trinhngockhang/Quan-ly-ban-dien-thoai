const passport = require('passport');
const userController = require('../Controller/UserController');
const productController = require('../Controller/productController');
const requireLogin = require('../middlewares/requireLogin');
const Product = require('../models/Product');

module.exports = app => {
  app.post("/api/createBill",async (req,res) => {
      await productController.createBill(req,res);
  })


  app.get("/api/getAllBill",async (req,res) => {
      await productController.getAllBill(req,res);
  })

  //tong san pham ban ra thang vua roi
  app.get("/api/billCountProduct",async (req,res) => {
     var data = {};
     data.monthOut = await productController.billCountProduct("Out","month");
     data.monthIn = await productController.billCountProduct("In","month");
     data.weekOut = await productController.billCountProduct("Out","week");
     data.weekIn = await productController.billCountProduct("In","week");
     res.send(data);
  })
}
