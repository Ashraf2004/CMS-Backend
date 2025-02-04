const mongoose = require("mongoose");

const userPolicySchema = new mongoose.Schema(
    {
        userPolicyId : {
            type : String,
            required : true
        },
        policyId : {
            type : String
        },
        policyName : {
            type : String,
            require : true
        },
        userId : {
            type : String,
            required : true
        },
        username : {
            type : String,
            required : true          
        },
        applicationDate : {
            type : String,
        },
        startDate : {
            type : String,
        },
        endDate : {
            type : String
        },
        status : {
            type : String
        },
        action : {
            type : String,
            required : true
        }
    },
    {timestamps:true},
    {collection : "userpolicies"}
)

const userPolicy = mongoose.model("userpolicy",userPolicySchema);


module.exports = userPolicy;