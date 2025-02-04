const express = require("express");
const User = require("../models/user");

const router = express.Router();



router.get("/", async (req,res) => {
    const data = await User.find();
    res.status(200).json({users : data});
})

router.get("/role/:role", async (req,res) => {
    try{
    const data = await User.find({role:req.params.role});
    res.status(200).json({message : `Users sent Successfully`,users : data});
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`})
    }
})


router.route("/:id")
.get(async (req,res) => {
    try{
    const {id} = req.params;
    const data = await User.findOne({userId:id});
    if(data){
        res.status(200).json({message : "User Found",user:data});
    }
    else{
        res.status(404).json({message : `User with given ID ${id} Not Found`});
    }
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`});
    }
})
.put(async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const result = await User.updateOne({ userId: id }, { $set: updatedData });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: `User with ID ${id} not found` });
        }
        res.status(200).json({ message: `User with ID ${id} updated successfully` });
    } catch (err) {
        res.status(500).json({ message: `Error occurred: ${err.message}` });
    }
})
.delete(async (req,res) => {
    try{
        const {id} = req.params;
        const getRecord = await User.findOne({userId:id});
        if(!getRecord){
            res.status(404).json({message : `User with ID ${id} Not Found`});
        }
        else{
            const result = await User.deleteOne({userId:id});
            if(result.deletedCount>0){
            res.status(200).json({message : `User with ID ${id} deleted Successfully`});
            }
        }
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`});
    }
})

module.exports = router;