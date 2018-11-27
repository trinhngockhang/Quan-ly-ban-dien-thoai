const Product = require('../models/Product');
const Bill = require('../models/Bill');
const async = require('async');
const BillIn = require('../models/BillIn');
const Client = require("../models/client");
var convert =  function(item){
  var day = item.createdAt.getDate();
  var month = item.createdAt.getMonth() + 1;
  var year = item.createdAt.getFullYear();
  var arr2 = new Array();
  var arr = new Array();
  arr.push(item.productId.name);
  arr.push(item.productId.type);
  arr.push(item.createByUser.username);
  arr.push(item.numberOfProduct);
  if(item.clientId){
    arr.push(item.clientId.name);
  }
  if(item.producerId){
    arr.push(item.producerId.name);
  }
  arr.push(item.unitPrice);
  arr.push(item.totalPrice);
  arr.push(day + "/" + month + "/" + year);
  arr2.push(arr);
  return arr2;
}

var getAllBill = async function(typeBill,req,res){
  try{
    const data = await Bill.find({},['productId','numberOfProduct','unitPrice','totalPrice','createdAt'])
    .populate('productId',['name','type']).populate('createByUser','username').populate('clientId','name');
    async.concat(data,function(item,callback){
      var newItem = convert(item);
      callback(null,newItem);
    },(err,doc)=>{
      if(err) res.send("loi");
      else res.send(doc);
    })
  }catch(err){
    res.send(err);
  }
}

var getAllBillIn = async function(typeBill,req,res){
  try{
    const data = await BillIn.find({},['productId','numberOfProduct','unitPrice','totalPrice','createdAt'])
    .populate('productId',['name','type']).populate('createByUser','username').populate('producerId','name');
    async.concat(data,function(item,callback){
      var newItem = convert(item);
      callback(null,newItem);
    },(err,doc)=>{
      if(err) res.send("loi");
      else res.send(doc);
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

module.exports = {
  getAllBill,
  getDataTenDays,
  billCountProduct,
  createBill,
  getAllBillIn
}
