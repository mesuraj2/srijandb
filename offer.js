const express=require('express')
const router=express.Router()
const Chat =require('./models/chat')
const User =require('./models/users')
const message =require('./models/Message')
const offer =require('./models/offer')
const fetchuser=require('./fetchuser')


router.post("/",fetchuser,async (req,res)=>{
    const {Offername,coordinate,offer_chat_id}=req.body;

    let location=JSON.parse(coordinate);
    try {
        const offer1 = await offer.create({
            offername:Offername,
            Location:{
                type: "Point",
                coordinates: location
              },
              chat_id:offer_chat_id
          });
          const fullGroupChat = await offer.findOne({ _id: offer1._id })
          res.status(200).json(fullGroupChat);
    } catch (error) {
        res.send(error)
    }
})
router.get("/offernearyou",async (req,res)=>{
    try {
          const fullGroupChat = await offer.find(
   {
     Location:
       { $near :
          {
            $geometry: { type: "Point",  coordinates: [ 17.614, 78.0816 ] },
            $maxDistance: 100000
          }
       }
   }
)
          res.status(200).json(fullGroupChat);
    } catch (error) {
        res.send(error)
    }
})

router.get("/topChatnearYou",async (req,res)=>{
    try {
          const fullGroupChat = await Chat.find(
   {
     Location:
       { $near :
          {
            $geometry: { type: "Point",  coordinates: [ 17.614, 78.0816 ] },
            $maxDistance: 100000
          }
       }
   }
)
          res.status(200).json(fullGroupChat);
    } catch (error) {
        res.send(error)
    }
})


router.post("/offerdetail",async (req,res)=>{
    try {
          const fullGroupChat = await offer.find({_id:req.body.id})
          res.status(200).json(fullGroupChat);
    } catch (error) {
        res.send(error)
    }
})


module.exports=router