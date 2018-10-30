const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {type:String,unique:true,required:true},
  price: {type:Number,required:true,default:0},
  type: {type:String,default:null},
  description: {type:String,default:"Nothing about this phone"},
  image: {type:String,default:'images/defaultPhone.png'},
  available: {type:Number,default:0},
  sold: {type:Number,default:0}
});


module.exports = mongoose.model('Product', productSchema);
