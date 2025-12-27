const mongoose=require("mongoose");

const bookingSchema=new mongoose.Schema({
    //kya kya rahai gaa schema mai
    listingid:{type:mongoose.Schema.Types.ObjectId,ref:"Listing"},
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    checkin:Date,
    checkout:Date,

});

module.exports=mongoose.model("booking",bookingSchema);