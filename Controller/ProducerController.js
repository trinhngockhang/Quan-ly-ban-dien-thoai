const Producer = require('../models/Producer');

var createProducer = async function(req,res){
  try {
    data = req.body;
    await  Producer.create(data);
    res.send("Success");
  }catch(err){
    res.send("Đã xảy ra lỗi");
  }
}

var getAllProducer= async function(){
    const data = await Producer.find();
    return data;
}

module.exports = {
  createProducer,
  getAllProducer
}
