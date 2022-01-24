const express= require('express');
const req = require('express/lib/request');
const router= express.Router();
const Text=require('../model/add_info');
const mongoose=require('mongoose')
const auth=require('../middleware/auth')


router.get('/',auth,(req,res,next)=>{
    
    Text.find().then(result=>{
        res.status(200).json({
            msg: "All texts",
            textData:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            msg: "Cannot show texts",
            error:err
        })
    })

})

router.post('/',auth,(req,res,next)=>{
   const text=new Text({
       _id: new mongoose.Types.ObjectId,
       textData: req.body.textData,
   })
   text.save().then(result=>{
       console.log(result);
       res.status(200).json({
        msg: "Data inserted successfully",
           newText: result
       })
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json({
        msg: "Cannot add data",
           error:err
       })
   })
})

module.exports=router;

