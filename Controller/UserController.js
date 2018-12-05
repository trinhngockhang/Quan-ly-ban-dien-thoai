const UserModel = require('../models/User');

var createUser = async function(req,res){
  try {
    data = req.body;
    await  UserModel.create(data);
    res.send("Success");
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

async function allUser(){
  try{
    var result = await UserModel.find({},["username","email","phone","gender","type"]);
    return result;
  }catch(err){
    return(err);
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
  if(!req.body){
    res.send('err');
  }else{
  var objForUpdate = {};
  var linkAva = req.file.path;
  if(req.body.username) objForUpdate.username = req.body.username;
  if(req.body.email) objForUpdate.email = req.body.email;
  if(req.body.name) objForUpdate.name = req.body.name;
  if(req.body.phone) objForUpdate.phone = req.body.phone;
  if(req.file) objForUpdate.avatarLink = linkAva.substring(7,linkAva.length);
  console.log(objForUpdate);
  try{
    await UserModel.findOneAndUpdate({_id:req.user._id},objForUpdate);
  }catch(err){
    console.log(err);
    res.send("err");
  }
  res.send("Success");
  }
}

module.exports = {
  createUser,
  findUserByName,
  countUser,
  updateUser,
  allUser
}
