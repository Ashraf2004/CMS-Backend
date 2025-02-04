const express = require("express");
const {v4 : uuidv4} = require("uuid");
const Claim = require("../models/claim");


const router = express.Router();

router.get("/", async (req,res) => {
    const data = await Claim.find();
    res.status(200).json({claims : data});
});

router.post("/", async (req,res) => {
        try{
            const newRecord = {claimId:uuidv4(),...req.body}
            const result = await Claim.create(newRecord);
            res.status(200).json({message : "Claim added Successfully",claimId:newRecord.claimId});
        }
        catch(Err){
            res.status(404).json({message : `Error Occurred : ${Err}`});
        }
});

router.get("/assignedclaims/:id", async (req,res) => {
    try{
    const {id} = req.params;
    const data = await Claim.find({assignedTo:id});
    res.status(200).json({claims : data});
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`});
    }

});

router.route("/:id")
.get(async (req,res) => {
    try{
        const {id} = req.params;
        const result = await Claim.find({userId:id});
        if(!result)
            res.status(404).json({message : `Claim with ID ${id} not found`});
        else
            res.status(200).json({message : `Claim Found`,data:result});
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`});
    }
})
.put(async (req,res) => {
    try{
        const {id} = req.params;
        const updatedData = {...req.body,claimId:id};
        const result = await Claim.updateOne({claimId:id},{$set : updatedData});
        if(result.modifiedCount===0){
            res.status(404).json({message : `Claim with ID ${id} Not Found`});
        }
        else{
            res.status(200).json({message:`Claim with ID ${id} updated Successfully`});
        }
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`});
    }
})



module.exports = router;