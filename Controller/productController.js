const Product = require('../models/Product');
const Bill = require('../models/Bill');
const async = require('async');

var getAllProduct = async function(){
    const data = await Product.find({});
    return data;
  }

var createProduct = async function(req,res){
  try {
    data = req.body;
    await  Product.create(data);
    res.send("Tạo sản phẩm thành ");
  }catch(err){
    res.send("Đã xảy ra lỗi");
  }
}

var findProductByType = async function(req,res){
  try{
    console.log(req.body.type);
    var result = await Product.find({type:req.body.type});
    res.send(result);
  }catch(err){
    res.send(err);
  }
}

var countProduct = async function(type,productId,change){
  if(type === "In"){
    try{
        var result = await  Product.findOneAndUpdate({_id: productId}, {$inc:{available:change}});
        return result;
    }catch(err){
        return err;
    }
  }
  else if(type === "Out"){
    try{
        var result = await Product.findOneAndUpdate({_id: productId,available:{$gt:change}}, {$inc:{available:-change,sold:change}});
        return result;
    }catch(err){
        return err;
    }
  }
}

var createBill = async function(req,res){
  try {
    var data = req.body;
    data.createByUser = req.user._id;
    if(data.type === "In"){
      data.totalPrice = "" + data.unitPrice * data.numberOfProduct;
    }else{
      var unitPriceProduct = await Product.findOne({_id:data.productId});
      console.log("unit",unitPriceProduct.price);
      data.totalPrice ="" + data.numberOfProduct * unitPriceProduct.price;
    }
    var result = await countProduct(data.type,data.productId,data.numberOfProduct);
    console.log("result",result);
    if(result){
      console.log(data);
      await  Bill.create(data);
      res.send("Nhập đơn hàng thành công");
    }else{
      res.send("Không còn đủ hàng trong kho");
    }

  }catch(err){
    res.send(400,err);
  }
}

var billCountProduct = async function(tb,time){
  var typeBill = tb;
  try{
    var now = new Date();
    var aMonthAgo = new Date();
    if(time === "month"){
      aMonthAgo.setMonth(now.getMonth() - 1 );
    }else if(time === "week"){
      aMonthAgo.setDate(now.getDate() - 7 );
    }
    var result = await Bill.aggregate([{$match : {"createdAt":{$gte:aMonthAgo},type:typeBill}},
                                      {$group: {_id:null,sum:{$sum:"$numberOfProduct"}}}]
    );
    return result[0].sum;
  }catch(err){
    return err;
  }
}

var queryDataByDate = async function(number){
  var firstTime = new Date();
  firstTime.setHours(0);
  firstTime.setMinutes(0);
  var secondTime = new Date();
  secondTime.setHours(0);
  secondTime.setMinutes(0);
  firstTime.setDate(firstTime.getDate() - number + 1);
  secondTime.setDate(secondTime.getDate() - number );
  var result = await Bill.aggregate([{$match : {"createdAt":{$gte:secondTime,$lt:firstTime},type:"Out"}},
                                    {$group: {_id:null,sum:{$sum:"$numberOfProduct"}}}]
  );
  //console.log(result[0].sum);
  return result.length > 0 ? result[0].sum : 0;
}

var getDataTenDays = async function(req,res){
  async.concat([0,1,2,3,4,5,6,7,8,9],async (number)=>{
    var data = await queryDataByDate(number);
    return data;
  },(err, doc) => {
    if(err) res.send(400);
    res.send(doc);
  });
}

module.exports = {
  getAllProduct,
  createProduct,
  createBill,
  billCountProduct,
  findProductByType,
  getDataTenDays
}
