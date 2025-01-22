const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {
        type: String, require: true
    },
    address: { type: String },
    // memberId: { type: String },
    phone_number: {
        type: Number, require: true
    },
    emergency_number: {
        type: Number, require: true
    },
    profilePic: { type: String },
    status: { type: String },
    doj: { type: Date },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer'  // Reference the Trainer collection
    },
    lastPayment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    createdBy: { type: String }

}, { timestamps: true });

const Member = new mongoose.model("members", memberSchema);
module.exports = Member;