const express=require("express");
const router=express.Router();
const Booking=require("../model/booking");
const auth=require("../middleware/auth");

//create new booking

router.post("/",auth,async (req,res)=>{
    try{
        const {listingid,checkin,checkout}=req.body;
        const booking=new Booking({
            listingid,
            userid:req.user.id,
            checkin,
            checkout
        });
        await booking.save();
        res.status(201).json(booking);
    }
    catch(error)
    {
        res.status(500).json({
            message:"error creating booking",
        })

    }
});

//user apnii booking dekhaigaa ki usnaii kon kon si booking kii hai

router.get("/my-booking",auth,async(req,res)=>{
    try
    {
        const booking=await Booking.find({userid:req.user.id}).populate("listingid");
        res.json(booking);
    }
    catch(error)
    {
        res.status(500).json({message:"error in fetching booking"});
    }
});


//get single booking by their id

router.get("/:id",auth,async (req,res)=>{
    try{
        const booking=await Booking.findById(req.params.id).populate("listingid");
        if(!booking)
            return res.status(404).json({message:"booking not found"});
        if(booking.userid.toString()!==req.user.id)
            return res.status(403).json({message:"unauthorised"});
        res.json(booking);
    }
    catch(error)
    {
res.status(500).json({message:"error fetching booking"});
    }
});

//update the booking
router.put("/:id",auth,async (req,res)=>{
    try{
        const booking =await Booking.findById(req.params.id);
        if(!booking)
            return res.status(404).json({message:"booking not found"});
        if(booking.userid.toString()!==req.userid)
            return res.status(403).json({message:"unauthorised"});

        const {checkin,checkout}=req.body;
        booking.checkin=checkin || booking.checkin;
        booking.checkout=checkout || booking.checkout;
        await booking.save();
        res.json(booking);
    }
    catch(error)
    {
        res.status(500).json({message:"error updating booking"});
    }
});

//delete
router.delete("/:id",auth,async (req,res)=>{
    try{
const booking=await Booking.findById(req.params.id);
   if(!booking)
            return res.status(404).json({message:"booking not found"});
        if(booking.userid.toString()!==req.userid)
            return res.status(403).json({message:"unauthorised"});

   await booking.deleteOne();
   res.json({message:"booking deleted"});
    }
    catch(error)
    {
 res.status(500).json({message:"error deleting booking"});
    }
})

module.exports=router;