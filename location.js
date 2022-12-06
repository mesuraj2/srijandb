const express=require('express')
const router=express.Router();
const Location =require('./models/location')

router.get("/",async (req,res)=>{
    const {coordinate,mname}=req.body

    let location=JSON.parse(coordinate);

    try {
        const saveLocation = await Location.create({
          name:mname,
          Location:{
            type: "Point",
            coordinates: location
          }
        });
    
        // const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        //   .populate("users", "-password")
        // //   .populate("groupAdmin", "-password");
    
        res.status(200).json(saveLocation);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }

})


module.exports=router