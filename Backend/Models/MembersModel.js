const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {
        type: String, require: true
    },
    address: { type: String },
    gender: { type: String },
    phone_number: {
        type: Number, require: true
    },
    emergency_number: {
        type: Number, require: true
    },
    profilePic: { type: String },
    status: { type: String },
    doj: { type: Date },
    assigned_trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trainer'
    },
    lastPayment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId }

}, { timestamps: true });

const Member = new mongoose.model("members", memberSchema);
module.exports = Member;