const passport = require('passport');
const userController = require('../Controller/UserController');
const productController = require('../Controller/productController');
const requireLogin = require('../middlewares/requireLogin');
const Product = require('../models/Product');
const billController = require('../Controller/BillController');

module.exports = app => {
  app.post("/api/createBill",async (req,res) => {
      await billController.createBill("Out",req,res);
  })

  app.post("/api/createBillIn",async (req,res) => {
      await billController.createBill("In",req,res);
  })

  app.get("/api/getAllBill",async (req,res) => {
      await billController.getAllBill("Out",req,res);
  })

  app.get("/api/getAllBillIn",async (req,res) => {
      await billController.getAllBillIn("In",req,res);
  })

  //tong san pham ban ra thang vua roi
  app.get("/api/billCountProduct",async (req,res) => {
     var data = {};
     data.monthOut = await billController.billCountProduct("Out","month");
     data.monthIn = await billController.billCountProduct("In","month");
     data.weekOut = await billController.billCountProduct("Out","week");
     data.weekIn = await billController.billCountProduct("In","week");
     res.send(data);
  })

  app.get("/api/dataTenDays",async (req,res) => {
      await billController.getDataTenDays(req,res);
  })


  
}
