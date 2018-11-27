const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name:{type : String,required : true},
  username : {type : String,required : true,unique:true},
  password : { type : String,minlength : 6},
  email : {type: String},
  type : {type:String,required:true},
  gender: {type:String,required:true},
  phone: { type : String,required:true},
  avatarLink : {type:String,default:'images/defaultUser.png'}
});

userSchema.pre('save', function (next) {
    var user = this;
    console.log("this is user",user);

    if (!user.isModified('password')) {
      return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  });

module.exports = mongoose.model('User', userSchema);
