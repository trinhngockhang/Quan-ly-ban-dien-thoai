const UserModel = require('../models/User');

var createUser = async function(req,res){
  try {
    data = req.body;
    await  UserModel.create(data);
    res.send("Tạo user thành công");
  }catch(err){
    res.send("Đã xảy ra lỗi");
  }
}

async function findUserByName(data){
  try{
    const doc = await UserModel.findOne({username:data});
    return  doc;
  }catch(err){
    console.log(err);
    return err;
  }
}

async function allUser(req,res){
  try{
    var result = await UserModel.find({},["username","email","type"]);
    res.send(result);
  }catch(err){
    res.send(err);
  }
}

async function countUser(){
  try{
    const data = await UserModel.count();
    return data;
  }catch(err){
    return err;
  }
}

async function updateUser(req,res){
  var objForUpdate = {};
  if(req.body.username) objForUpdate.username = req.body.username;
  if(req.body.email) objForUpdate.email = req.body.email;
  console.log(objForUpdate);
  try{
    await UserModel.findOneAndUpdate({_id:req.user._id},objForUpdate);
  }catch(err){
    res.send("Đã xảy ra lỗi");
  }
  res.send("Cập nhật thành công,không tin thì F5");
}

module.exports = {
  createUser,
  findUserByName,
  countUser,
  updateUser,
  allUser
}
