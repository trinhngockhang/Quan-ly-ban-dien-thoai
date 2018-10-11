const passport = require('passport');
const productController = require('../Controller/productController');
const Product = require('../models/Product');

module.exports = app => {
  app.get('/allProduct',async (req,res) => {
    const data = await productController.getAllProduct();
    console.log(data);
    res.json(data);
  })

  app.post('/createProduct',(req,res) => {
    productController.createProduct(req,res);
  })
};
