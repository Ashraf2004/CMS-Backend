const bcrypt = require("bcrypt");
const {v4 : uuidv4} = require("uuid");

const User = require("../models/user");



const registerRoute = async (req,res) => {
    try{
        const {emailId} = req.body;
        if(emailId){
            const getRecord = await User.findOne({emailId:emailId});
            if(getRecord) {
                res.status(409).json({message : `User with email ID ${emailId} already exists`});
            }
            else{
                const {password} = req.body;
                const hashedPassword = await bcrypt.hash(password,10);
                const newItem = {userId:uuidv4(),...req.body,password:hashedPassword};
                const newUser = await User.create(newItem);
                res.status(200).json({message : "User added Successfully",newUser});
            }
        }
    }
    catch(Err){
        res.status(404).json({message : `Error Occurred : ${Err}`});
    }
}


module.exports = {registerRoute};