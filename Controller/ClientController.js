const client = require('../models/client');

var createClient = async function(req,res){
  try {
    data = req.body;
    await  client.create(data);
    res.send("Success");
  }catch(err){
    res.send("Đã xảy ra lỗi");
  }
}

var getAllClient = async function(req,res){
  var data = await client.find();
  res.send(data);
}

module.exports = {
  createClient,
  getAllClient
}
