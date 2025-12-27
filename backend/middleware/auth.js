const jwt=require("jsonwebtoken");
module.exports=function(req,res,next)
{
    const token=req.header('Authorization')?.split(" ")[1];
    if(!token)
        return res.status(401).json({message :"no token"});
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        next();

    }
    catch(error)
    {
        res.status(401).json({message:"invalid token"});
    }
}