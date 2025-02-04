const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
    {
        policyId : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        description : {
            type : String,
        },
        policyPlan : {
            type : String,
            required : true,
        },
        premiumAmount : {
            type : Number
        },
        coverageType : {
            type : String
        },
        coverageAmount : {
            type : Number
        },
    },
    {timestamps:true},
    {collection : "policies"}
)

const Policy = mongoose.model("policy",policySchema);


module.exports = Policy;