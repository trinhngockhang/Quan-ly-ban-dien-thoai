const Product = require('../models/Product');

var getAllProduct = async function(){
    const data = await Product.find({});
    return data;
  }

var createProduct = async function(req,res){
  try {
    data = req.body;
    await  Product.create(data);
    res.send(data);
  }catch(err){
    res.send(400,err);
  }
}

module.exports = {
  getAllProduct,
  createProduct
}
