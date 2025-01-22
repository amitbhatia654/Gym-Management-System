const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({

    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    paymentMode: { type: String },
    memberPlan: { type: String },
    PlanRenew: { type: Date },
    ValidTill: { type: Date },

}, { timestamps: true });

const Payment = new mongoose.model("payment", PaymentSchema);
module.exports = Payment;