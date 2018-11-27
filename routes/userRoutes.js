const passport = require('passport');
const userController = require('../Controller/UserController');
const requireLogin = require('../middlewares/requireLogin');
const requireBoss = require('../middlewares/requireBoss');
const producerController = require('../Controller/ProducerController');
const clientController = require('../Controller/ClientController');
const User = require('../models/User');


module.exports = app => {

  app.post("/api/createUser",(req,res) => {
      userController.createUser(req,res);
  })

  app.get('/api/current_user', (req, res) => {
      res.send(req.user);
  });

  app.get("/api/countUser",async (req,res) => {
      var count = await User.countDocuments();
      res.send("" + count);
  })

  app.post('/api/updateUser',async (req, res) => {
      await userController.updateUser(req,res);
  });

  app.get("/api/allUser",async (req,res) => {
      await userController.allUser(req,res);
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

  app.post("/api/createClient",async (req,res) =>{
    var result = await clientController.createClient(req,res);
    res.send("done");
  })

  app.get("/api/allClient",async (req,res) => {
    await clientController.getAllClient(req,res);
  })

  app.get("/api/allProducer",async (req,res) => {
    const doc = await producerController.getAllProducer();
    res.send(doc);
  })


};
