const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductModel = require('./Product');
const billInSchema = new Schema({
  productId : {type: Schema.Types.ObjectId,ref:'Product',required:true},
  createByUser : {type: Schema.Types.ObjectId,ref:'User',required:true},
  producerId : {type: Schema.Types.ObjectId,ref:'Producer',required:true},
  unitPrice : {type:Number},
  numberOfProduct: {type:Number,required:true},
  totalPrice : {type:Number}
},{timestamps : true});

module.exports = mongoose.model('BillIn', billInSchema);
