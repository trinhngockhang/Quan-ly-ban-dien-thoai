const passport = require('passport');
const productController = require('../Controller/productController');
const Product = require('../models/Product');
const requireLogin = require('../middlewares/requireLogin');
module.exports = app => {
  app.get('/api/allProduct',async (req,res) => {
    const data = await productController.getAllProduct();
    console.log(data);
    res.json(data);
  })

  app.post('/api/createProduct',async (req,res) => {
    await productController.createProduct(req,res);
  })

  app.get("/api/topPhone",async (req,res) => {
    await productController.topPhone(req,res);
  })

  app.get("/api/topType",async (req,res) => {
    await productController.topType(req,res);
  })
  app.get("/api/countProduct",async (req,res) => {
      var count = await Product.countDocuments();
      res.send("" + count);
  })

  app.post("/api/productType",async (req,res) => {
      await productController.findProductByType(req,res);
  })

  app.post("/api/updateProduct",async (req,res) => {
      await productController.updateProduct(req,res);
  })

  app.get("/api/deleteProductByName",requireLogin,async (req,res) => {
      var result = await Product.deleteOne({name:req.query.name});
      res.send("done");
  })

};
