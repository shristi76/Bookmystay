const mongoose=require('mongoose');
const userschema=new mongoose.Schema({
    name :String,
    email:{type:String,unique:true},
    password:String,
    isHost:{type:Boolean,default:false},
});
module.exports=mongoose.model("user",userschema);