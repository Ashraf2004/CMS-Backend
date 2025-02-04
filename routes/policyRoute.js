const express = require("express");
const {v4 : uuidv4} = require("uuid");
const Policy = require("../models/policy");

const router = express.Router();

router.get("/", async (req,res) => {
    const data = await Policy.find();
    res.status(200).json({message:'Policies sent Successfully',policies : data});
})

router.post("/", async (req,res) => {
    try{
        const newRecord = {policyId:uuidv4(),...req.body}
        const result = await Policy.create(newRecord);
        if(result)
        res.status(200).json({message : "Policy added Successfully",policyId:newRecord.policyId});
        else
        res.status(404).json({message : "Unable to add policy"});
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`});
    }
})

router.route("/:id")
.get(async (req,res) => {
    try{
    const {id} = req.params;
    const record = await Policy.findOne({policyId:id});
    if(record){
        res.status(200).json({message : "Policy Found",policy:record});
    }
    else{
        res.status(404).json({message : "Policy Not Found"});
    }
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`});
    }
})
.put(async (req,res) => {
    try{
        const {id} = req.params;
        const updatedData = {...req.body,policyId:id};
        const result = await Policy.updateOne({policyId:id},{$set : updatedData});
        if (result.matchedCount === 0) {
            res.status(404).json({message : `Policy with ID ${id} Not Found`});
        }
        else{
            res.status(200).json({message:`Policy with ID ${id} updated Successfully`});
        }
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`});
    }
})
.delete(async (req,res) => {
    try{
        const {id} = req.params;
        const result = await Policy.deleteOne({policyId:id});
        if(result.deletedCount==0){
            res.status(404).json({message : `Policy with ID ${id} Not Found`});
        }
        else{
            res.status(200).json({message : `Policy with ID ${id} deleted Successfully`});
        }
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`});
    }
})


module.exports = router;