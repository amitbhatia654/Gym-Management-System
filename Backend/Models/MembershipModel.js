const mongoose = require("mongoose");

const MemberPlanSchema = new mongoose.Schema({

    months: { type: Number },
    fees: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId }

}, { timestamps: true });

const MemberPlan = new mongoose.model("memberPlan", MemberPlanSchema);
module.exports = MemberPlan;