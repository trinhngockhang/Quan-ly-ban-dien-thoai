const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {type:String,unique:true,required:true},
  price: Number,
  type: String,
  sellNumber: Number,
  description: String,
  imageLink : String
});


module.exports = mongoose.model('Product', productSchema);
