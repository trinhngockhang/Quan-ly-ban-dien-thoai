const UserModel = require('../models/User');

var createUser = async function(req,res){
  try {
    data = req.body;
    await  UserModel.create(data);
    res.send(data);
  }catch(err){
    res.send(400,err);
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

async function countUser(){
  try{
    const data = await UserModel.count();
    return data;
  }catch(err){
    return err;
  }
}

module.exports = {
  createUser,
  findUserByName,
  countUser
}
