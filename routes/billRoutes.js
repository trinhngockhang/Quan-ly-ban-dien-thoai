const passport = require('passport');
const userController = require('../Controller/UserController');
const productController = require('../Controller/productController');
const requireLogin = require('../middlewares/requireLogin');
const Product = require('../models/Product');
const billController = require('../Controller/BillController');
const styles = require('../config/styleExcel');
const excel = require('node-excel-export');
const specification = {
  productName: {
    displayName: 'Sản phẩm',
    headerStyle : styles.headerNormal,
    width : 120
  },
  type: {
    displayName: "Hãng",
    headerStyle : styles.headerNormal,
    width : 70
  },
  username: {
    displayName: "Người nhập",
    headerStyle : styles.headerNormal,
    width : 150
  },
  numberOfProduct: {
    displayName: "Số sản phẩm",
    headerStyle : styles.headerNormal,
    width : 100
  },
  name: {
    displayName: "",
    headerStyle : styles.headerNormal,
    width : 200
  },
  phone: {
    displayName: "SĐT",
    headerStyle : styles.headerNormal,
    width : 200
  },
  unitPrice:{
    displayName: "Đơn giá",
    headerStyle : styles.headerNormal,
    width : 100
  },
  totalPrice:{
    displayName: "Tổng tiền",
    headerStyle : styles.headerNormal,
    width : 100
  },
  date:{
    displayName: "Ngày",
    headerStyle : styles.headerNormal,
    width : 100
  }
}


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
      const dataBillIn = await billController.getAllBillIn("In",req,res);
      console.log(dataBillIn);
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

  app.get("/api/excel/billin",(req,res) => {
    var dataArr = billController.getdataBillExcelIn();
    const heading = [
      [{value:'Danh sách hoá đơn nhập hàng',style:styles.headerNormal}]
    ];

    const merges = [
      { start: { row: 1, column: 1}, end: { row: 1, column: 10 } }
    ]
    var speIn = specification;
    speIn.name.displayName = "Nhà cung cấp";
    const report = excel.buildExport(
      [
        {
        name:"Bill",
        heading:heading,
        merges:merges,
        specification:speIn,
        data:dataArr
       }
      ]
    )
    res.attachment('billIn.xlsx');
    return res.send(report);
  })

  app.get("/api/excel/billOut",(req,res) => {
    var dataArr = billController.getDataBillExcelOut();
    const heading = [
      [{value:'Danh sách hoá đơn bán hàng',style:styles.headerNormal}]
    ];
    var speOut = specification;
    speOut.name.displayName = "Khách hàng";
    const merges = [
      { start: { row: 1, column: 1}, end: { row: 1, column: 10 } }
    ]
    const report = excel.buildExport(
      [
        {
        name:"Bill",
        heading:heading,
        merges:merges,
        specification:speOut,
        data:dataArr
       }
      ]
    )
    res.attachment('billOut.xlsx');
    return res.send(report);
  })

}
