const mongoose=require("mongoose");

const profileschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        unique:true,
    },
    bio:String,
    phone:String,
    gender:String,
    dob:String,
    avtar:String,
    location:String,
    createdAt:{

        type:Date,
        default:Date.now,

    },

});
module.exports=mongoose.model("profile",profileschema);