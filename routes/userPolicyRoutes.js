const express = require("express");
const {v4 : uuidv4} = require("uuid");
const Policy = require("../models/policy");
const userPolicy = require("../models/userPolicy");

const router = express.Router();

router.get("/", async (req,res) => {
    const result = await userPolicy.find();
    res.status(200).json({data : result});
})

router.post("/", async (req,res) => {
    try{
    const newRecord = {userPolicyId:uuidv4(),...req.body};
    
    const getPolicy = await Policy.findOne({policyId:newRecord.policyId});
    if(!getPolicy){
        res.status(404).json({message : "Policy not found"});
    }
    else{
    const getRecord = await userPolicy.findOne({policyId:newRecord.policyId,userId:newRecord.userId});
    if (getRecord) {
        res.status(409).json({message : `User with ID ${newRecord.userId} has already applied for the policy`});
    }
    else {
        const result = await userPolicy.create(newRecord);
        res.status(201).json({message : `Policy applied Successfully`});
    }
    }
    }
    catch(Err){
        res.status(404).json({message:`Error Occurred : ${Err}`});
    }
})

router.route("/:id")
.get(async (req,res) => {
    const {id} = req.params;
    const result = await userPolicy.find({userId:id});
    res.status(200).json({message : `User policy associated with ID ${id} Found`,data:result});
})
.put( async (req,res) => {
    try{
        const {id} = req.params;
        const getRecord = await userPolicy.findOne({userPolicyId:id});
        if(!getRecord){
            res.status(404).json({message:"No user applied for policy with given ID"});
        }
        else{
            const result = await userPolicy.updateOne({userPolicyId:id},{$set : req.body});
            res.status(200).json({message:`The policy has ${req.body.status} Successfully`});
        }
        }
        catch(Err){
            res.status(404).json({message:`Error Occurred : ${Err}`});
        }
})
.delete(async (req,res) => {
    try{
        const {id} = req.params;
        const result = await userPolicy.deleteOne({userPolicyId : id});
        if(result.deletedCount==0){
            res.status(404).json({message : `Record not Found`});
        }
        else{
            res.status(200).json({message : `Record deleted Successfully`});
        }
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`});
    }
})

module.exports = router;