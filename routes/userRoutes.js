const passport = require('passport');
const userController = require('../Controller/UserController');
const requireLogin = require('../middlewares/requireLogin');
const requireBoss = require('../middlewares/requireBoss');
const producerController = require('../Controller/ProducerController');
const clientController = require('../Controller/ClientController');
const User = require('../models/User');
const excel = require('node-excel-export');
const styles = require('../config/styleExcel');
var multer  = require('multer');
var allClients = [];
var allUsers = [];
var allProducer = [];
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        var fileObj = {
            "image/png": ".png",
            "image/jpeg": ".jpeg",
            "image/jpg": ".jpg"
        };
        if (fileObj[file.mimetype] == undefined) {
            cb(new Error("file format not valid"));
        } else {
            cb(null, file.fieldname + '-' + Date.now() + fileObj[file.mimetype])
        }
    }
});
var upload = multer({storage: storage});
module.exports = app => {
  app.post("/api/createUser",(req,res) => {
      userController.createUser(req,res);
  })

  app.get('/api/current_user', (req, res) => {
      res.send(req.user);
  });
  app.post('/testimage',upload.single('avatar'),function(req,res){
    console.log(req.path);
    res.send("a");
  })

  app.get("/api/countUser",async (req,res) => {
      var count = await User.countDocuments();
      res.send("" + count);
  })

  app.post('/api/updateUser', upload.single('avatar'),async function (req, res){
      await userController.updateUser(req,res);
  });

  app.get("/api/allUser",async (req,res) => {
    var data =  await userController.allUser();
    allUsers = data;
    res.send(data);
  })

  app.get("/api/deleteUserByName",requireLogin,async (req,res) => {
      var result = await User.deleteOne({name:req.query.name});
      res.send("done");
  })

  app.post("/api/createProducer",async (req,res) =>{
    var result = await producerController.createProducer(req,res);
    res.send("done");
  })

  app.get("/api/getAllProducer",async (req,res) =>{
    var result = await producerController.getAllProducer(req,res);
    res.send(result);
  })

  app.post("/api/updateProducer",async (req,res) => {
    await producerController.updateProducer(req,res);
  })

  app.post("/api/createClient",async (req,res) =>{
    var result = await clientController.createClient(req,res);
    res.send("done");
  })

  app.get("/api/allClient",async (req,res) => {
    var data = await clientController.getAllClient();
    allClients = data;
    res.send(data);
  })

  app.get("/api/allProducer",async (req,res) => {
    const doc = await producerController.getAllProducer();
    allProducer = doc;
    res.send(doc);
  })

  app.get("/api/excel/client", (req,res) => {
    const heading = [
      [{value:'Danh sách khách hàng',style:styles.headerNormal}]
    ];
    const specification = {
      name: {
        displayName: 'Tên',
        headerStyle : styles.headerNormal,
        width : 320
      },
      email: {
        displayName: "Email",
        headerStyle : styles.headerNormal,
        width : 200
      },
      phone: {
        displayName: "SĐT",
        headerStyle : styles.headerNormal,
        width : 250
      }
    }
    const merges = [
      { start: { row: 1, column: 1}, end: { row: 1, column: 10 } }
    ]
    const report = excel.buildExport(
      [
        {
        name:"Client",
        heading:heading,
        merges:merges,
        specification:specification,
        data:allClients
       }
      ]
    )
    res.attachment('Client.xlsx');
    return res.send(report);
  })

  app.get("/api/excel/users",(req,res) => {
    const heading = [
      [{value:'Danh sách nhân viên',style:styles.headerNormal}]
    ];
    const specification = {
      username: {
        displayName: 'Tên',
        headerStyle : styles.headerNormal,
        width : 320
      },
      email: {
        displayName: "Email",
        headerStyle : styles.headerNormal,
        width : 200
      },
      gender: {
        displayName: "Giới tính",
        headerStyle : styles.headerNormal,
        width : 250
      },
      phone:{
        displayName:"SĐT",
        headerStyle : styles.headerNormal,
        width: 300
      },
      type:{
        displayName:"Chức vụ",
        headerStyle : styles.headerNormal,
        width: 300
      }
    }
    const merges = [
      { start: { row: 1, column: 1}, end: { row: 1, column: 10 } }
    ]
    const report = excel.buildExport(
      [
        {
        name:"Users",
        heading:heading,
        merges:merges,
        specification:specification,
        data:allUsers
       }
      ]
    )
    res.attachment('Users.xlsx');
    return res.send(report);
  })

  app.get("/api/excel/producer",(req,res) => {
    const heading = [
      [{value:'Danh sách nhà cung cấp',style:styles.headerNormal}]
    ];
    const specification = {
      name: {
        displayName: 'Tên',
        headerStyle : styles.headerNormal,
        width : 320
      },
      email: {
        displayName: "Email",
        headerStyle : styles.headerNormal,
        width : 200
      },
      phone:{
        displayName:"SĐT",
        headerStyle : styles.headerNormal,
        width: 300
      },
      address:{
        displayName:"Địa chỉ",
        headerStyle : styles.headerNormal,
        width: 300
      }
    }
    const merges = [
      { start: { row: 1, column: 1}, end: { row: 1, column: 10 } }
    ]
    const report = excel.buildExport(
      [
        {
        name:"Producer",
        heading:heading,
        merges:merges,
        specification:specification,
        data:allProducer
       }
      ]
    )
    res.attachment('Producer.xlsx');
    return res.send(report);
  })
};
