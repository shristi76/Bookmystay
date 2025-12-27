const express=require('express')
const app=express();

const cors=require("cors");
const mongoose=require("mongoose");
require("dotenv").config();

const listingRoute=require("./routes/listing");


const authRoutes=require("./routes/auth");
const profileRoutes=require("./routes/profile");
const bookingRoutes=require("./routes/booking");


app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Api is running");
})

app.get('/hi',(req,res)=>{
    res.send("hello jii app kaisai hooo");
})


app.use("/api/auth",authRoutes)

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("mongodb connected")).catch((err)=>console.error(err));

app.use("/api/profile",profileRoutes);
app.use("/api/listing",listingRoute);

app.use("/api/booking",bookingRoutes);


const p=3000;
app.listen(p,()=>{
    console.log(`server is running at http://localhost:${p}`);
})



