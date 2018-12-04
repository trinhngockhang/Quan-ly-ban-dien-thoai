const passport = require('passport');
const productController = require('../Controller/productController');
const Product = require('../models/Product');
const requireLogin = require('../middlewares/requireLogin');
const excel = require('node-excel-export');
var allProduct  = [];
const styles = require('../config/styleExcel');
module.exports = app => {
  app.get('/api/allProduct',async (req,res) => {
    allProduct = await productController.getAllProduct();
    console.log(allProduct);
    res.json(allProduct);
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

  app.get("/api/excel/product",(req,res) => {
    const heading = [
      [{value:'Danh sách sản phẩm',style:styles.headerNormal}]
    ];
    console.log(styles.headerDark);
    const specification = {
      name: {
        displayName: 'Sản phẩm',
        headerStyle : styles.headerNormal,
        width : 120
      },
      type: {
        displayName: "Hãng",
        headerStyle : styles.headerNormal,
        width : 70
      },
      description: {
        displayName: "Mô tả",
        headerStyle : styles.headerNormal,
        width : 350
      },
      price: {
        displayName: "Giá",
        headerStyle : styles.headerNormal,
        width : 100
      },
      sold: {
        displayName: "Đã bán",
        headerStyle : styles.headerNormal,
        width : 100
      },
      available:{
        displayName: "Hàng còn",
        headerStyle : styles.headerNormal,
        width : 100
      }
    }
    const merges = [
      { start: { row: 1, column: 1}, end: { row: 1, column: 10 } }
    ]
    const report = excel.buildExport(
      [
        {
        name:"Product",
        heading:heading,
        merges:merges,
        specification:specification,
        data:allProduct
       }
      ]
    )
      res.attachment('product.xlsx');
      return res.send(report);
  })

};
