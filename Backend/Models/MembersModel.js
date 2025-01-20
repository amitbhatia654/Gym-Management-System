const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {
        type: String, require: true
    }, email: {
        type: String, require: true
    },
    address: { type: String },
    memberId: { type: String },
    phone_number: {
        type: Number, require: true
    },
    profilePic: { type: String },
    status: { type: String },
    memberPlan: { type: String },
    PlanRenew: { type: String },
    ValidTill: { type: String },
    doj: { type: String },
    createdBy: { type: String }

}, { timestamps: true });

const User = new mongoose.model("members", memberSchema);
module.exports = User;