const Product = require('../models/Product');
const Bill = require('../models/Bill');
const async = require('async');

var getAllProduct = async function(){
    const data = await Product.find({},["name","price","type","description","sold","available"]);
    return data;
}


var createProduct = async function(req,res){
  try {
    data = req.body;
    const result = await  Product.create(data);
    res.send("Success");
  }catch(err){
    res.send("Đã xảy ra lỗi");
  }
}

var findProductByType = async function(req,res){
  try{
    var result = await Product.find({type:req.body.type});
    res.send(result);
  }catch(err){
    res.send(err);
  }
}

var topPhone = async function(req,res){
  var result = await Product.find(
    {},
    ['name','sold'],
    {
      limit:5,
      sort:{
        sold:-1
      }
    }
  )
  res.send(result);
}

var queryTopType = async function(typeName){
  var result = await Product.aggregate([{$match : {type:typeName}},
                                    {$group: {_id:null,sum:{$sum:"$sold"}}}]
  );
  if(result.length>0){
    return result[0].sum;
  }else{
    return 0;
  }
}

var topType = async function(req,res){
  async.concat(["Iphone","Samsung","Oppo","Xiaomi","Other"],async (typeName)=>{
    var data = await queryTopType(typeName);
    return data;
  },(err, doc) => {
    if(err) res.send(400);
    res.send(doc);
  });
}

var updateProduct = async function(req,res){
  try{
    var updateData = {} ;
    if(req.body.price) updateData.price = req.body.price;
    if(req.body.name) updateData.name = req.body.name;
    if(req.body.description) updateData.description = req.body.description;
    var doc = await Product.findOneAndUpdate({_id:req.body.productId},{price:updateData.price,name:updateData.name,description:updateData.description});
    console.log(doc);
    res.send("Success");
  }catch(err){
    res.send("Err");
    console.log(err);
  }
}

module.exports = {
  getAllProduct,
  createProduct,
  findProductByType,
  topPhone,
  topType,
  updateProduct
}
