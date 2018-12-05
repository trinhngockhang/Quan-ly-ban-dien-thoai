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

var updateProducer = async function(req,res){
  try{
    var data = req.body;
    var doc = await Producer.findOneAndUpdate({_id:data.producerId},data);
    console.log(doc);
    res.send("Success");
  }catch(err){
    res.send("err");
  }

}

module.exports = {
  createProducer,
  getAllProducer,
  updateProducer
}
