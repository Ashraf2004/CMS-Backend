const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userId : {
            type : String,
            required : true
        },
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
        },
        emailId : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String
        },
        contactNo : {
            type : Number
        },
        age : {
            type : Number
        },
        gender : {
            type : String
        },
        street : {
            type : String
        },
        city : {
            type : String
        },
        pincode : {
            type : Number
        },
        role : {
            type : String,
            enum: ["admin", "user", "surveyor"],
            required : true,
            default : "user"
        },
    },
    {timestamps:true},
    {collection : "users"}
)

const User = mongoose.model("user",userSchema);


module.exports = User;