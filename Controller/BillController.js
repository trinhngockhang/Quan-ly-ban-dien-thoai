const Product = require('../models/Product');
const Bill = require('../models/Bill');
const async = require('async');
const BillIn = require('../models/BillIn');
const Client = require("../models/client");
var dataBillIn = [];
var dataBillOut = [];
var convert =  function(item){
  var data = {};
  var day = item.createdAt.getDate();
  var month = item.createdAt.getMonth() + 1;
  var year = item.createdAt.getFullYear();
  var arr2 = new Array();
  data._id = item._id;
  data.productName = item.productId.name;
  data.type = item.productId.type;
  data.username = item.createByUser.username;
  data.numberOfProduct = item.numberOfProduct;
  if(item.clientId){
    data.name = item.clientId.name;
    data.phone = item.clientId.phone;
  }
  if(item.producerId){
    data.name = item.producerId.name;
    data.phone = item.producerId.phone;
  }

  data.unitPrice = item.unitPrice;
  data.totalPrice = item.totalPrice;
  data.date = year + "/" + month + "/" + day;
  arr2.push(data);
  return arr2;
}

var getAllBill = async function(typeBill,req,res){
  try{
    const data = await Bill.find({},['_id','productId','numberOfProduct','unitPrice','totalPrice','createdAt'])
    .populate('productId',['name','type']).populate('createByUser','username').populate('clientId',['name','phone']);
    async.concat(data,function(item,callback){
      var newItem = convert(item);
      callback(null,newItem);
    },(err,doc)=>{
      if(err) res.send("loi");
      else{
        dataBillOut = doc;
        res.send(doc);
      }
    })
  }catch(err){
    res.send(err);
  }
}

var getAllBillIn = async function(typeBill,req,res){
  try{
    const data = await BillIn.find({},['_id','productId','numberOfProduct','unitPrice','totalPrice','createdAt'])
    .populate('productId',['name','type']).populate('createByUser','username').populate('producerId',['name','phone']);
    async.concat(data,function(item,callback){
      var newItem = convert(item);
      callback(null,newItem);
    },(err,doc)=>{
      if(err){
        res.send("loi");
      }
      else{
        dataBillIn = doc;
        console.log(doc);
        res.send(doc);
      }
    })
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
        var result = await Product.findOneAndUpdate({_id: productId,available:{$gt:change - 1}}, {$inc:{available:-change,sold:change}});
        return result;
    }catch(err){
        return err;
    }
  }
}

var createBill = async function(typeBill,req,res){
  try {
    var data = req.body;
      data.createByUser = req.user._id;
      if(typeBill === "In"){
        data.totalPrice = "" + data.unitPrice * data.numberOfProduct;
        var result = await countProduct(typeBill,data.productId,data.numberOfProduct);
        await BillIn.create(data);
        res.send("Success");
      }else{
        var findClient = await Client.findOne({phone:data.clientPhone});
        if(findClient){
          data.clientId = findClient._id;
        }else{
          var newClient = await Client.create({phone:data.clientPhone,email:data.clientEmail,name:data.clientName});
          data.clientId = newClient._id;
        }
        var unitPriceProduct = await Product.findOne({_id:data.productId});
        console.log("unit",unitPriceProduct.price);
        data.totalPrice ="" + data.numberOfProduct * unitPriceProduct.price;
        data.unitPrice = unitPriceProduct.price ;
        var result = await countProduct(typeBill,data.productId,data.numberOfProduct);
        if(result){
          await Bill.create(data);
          res.send("Success");
        }else{
          res.send("Not enough");
        }
      }
  }catch(err){
    res.send("err");
    console.log(err);
  }
}

var billCountProduct = async function(tb,time){
  var typeBill = tb;
  var result;
  try{
    var now = new Date();
    var aMonthAgo = new Date();
    if(time === "month"){
      aMonthAgo.setMonth(now.getMonth() - 1 );
    }else if(time === "week"){
      aMonthAgo.setDate(now.getDate() - 7 );
    }
    if(tb === "In"){
      result = await BillIn.aggregate([{$match : {"createdAt":{$gte:aMonthAgo}}},
                                        {$group: {_id:null,sum:{$sum:"$numberOfProduct"}}}]
      );
    }else{
      result = await Bill.aggregate([{$match : {"createdAt":{$gte:aMonthAgo}}},
                                        {$group: {_id:null,sum:{$sum:"$numberOfProduct"}}}]);
    }
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
  var result = await Bill.aggregate([{$match : {"createdAt":{$gte:secondTime,$lt:firstTime}}},
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

var deleteBillOut = async function(req,res){
  try{
    var id = req.body.id;
    var data = await Bill.findOne({_id:id},['numberOfProduct','productId','clientId']);
    var result = await Product.findOneAndUpdate({_id:data.productId},{$inc:{available:data.numberOfProduct,sold:-data.numberOfProduct}});
    var deleteResult = await Bill.remove({_id:id});
    var client = await Bill.find({clientId:data.clientId});
    console.log("client " + client + " ne ");
    if(!(client.length > 0)){
      await Client.remove({_id:data.clientId});
    }
    res.send("Success");
  }catch(err){
    console.log(err);
    res.send("err");
  }
}

var deleteBillIn = async function(req,res){
  try{
    var id = req.body.id;
    var data = await BillIn.findOne({_id:id},['numberOfProduct','productId']);
    var result = await Product.findOne({_id:data.productId},['available','sold']);
    console.log(result);
    if(data.numberOfProduct > result.available){
      res.send("can not");
    }else{
      var updateProduct = await Product.findOneAndUpdate({_id:data.productId},{$inc:{available:-data.numberOfProduct}});
      var deleteResult = await BillIn.remove({_id:id});
      res.send("Success");
    }
  }catch(err){
    res.send(err);
  }
}

var getdataBillExcelIn = function(){
  return dataBillIn;
}
var getDataBillExcelOut = function(){
  return dataBillOut;
}


module.exports = {
  getAllBill,
  getDataTenDays,
  billCountProduct,
  createBill,
  getAllBillIn,
  getdataBillExcelIn,
  getDataBillExcelOut,
  deleteBillOut,
  deleteBillIn
}
