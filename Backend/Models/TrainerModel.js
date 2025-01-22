const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    name: {
        type: String, require: true
    },
    address: { type: String },
    // memberId: { type: String },
    phone_number: {
        type: Number, require: true
    },
    gender: { type: String },
    emergency_number: {
        type: Number, require: true
    },
    profilePic: { type: String },
    doj: { type: Date },
    training_exp: { type: Number },
    shift_timings: { type: String },
    specialization: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId }

}, { timestamps: true });

const Trainer = new mongoose.model("trainer", trainerSchema);
module.exports = Trainer;