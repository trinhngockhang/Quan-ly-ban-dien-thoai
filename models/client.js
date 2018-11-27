const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const clientSchema = new Schema({
  name : {type : String,required : true},
  email : {type: String},
  phone : {type: String,reuired:true,unique:true}
});


module.exports = mongoose.model('Client', clientSchema);
