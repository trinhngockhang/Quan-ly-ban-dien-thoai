const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductModel = require('./Product');
const billSchema = new Schema({
  productId : {type: Schema.Types.ObjectId,ref:'ProductModel',required:true},
  createByUser : {type: Schema.Types.ObjectId,ref:'User',required:true},
  type : {type:String,required:true},
  unitPrice : {type:Number},
  numberOfProduct: {type:Number,required:true},
  totalPrice : {type:Number}
},{timestamps : true});


module.exports = mongoose.model('Bill', billSchema);
