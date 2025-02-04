const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
    {
        claimId : {
            type : String,
            required : true
        },
        policyId : {
            type : String
        },
        userId : {
            type : String
        },
        policyName : {
            type : String,
            required : true
        },
        claimAmount : {
            type : Number
        },
        claimDate : {
            type : String
        },
        eventDate : {
            type : String
        },
        amountApproved : {
            type : Number
        },
        claimStatus : {
            type : String
        },
        actionStatus : {
            type : String
        },
        customerResponse : {
            type : String
        },
        customerName : {
            type : String
        },
        assignedTo : {
            type : String,
            default : ""
        }
    },
    {timestamps:true},
    {collection : "claims"}
)

const Claim = mongoose.model("claim",claimSchema);


module.exports = Claim;