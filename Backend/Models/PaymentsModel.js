const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({

    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    paymentMode: { type: String },
    memberPlan: { type: String },
    planRenew: { type: Date },
    validTill: { type: Date },
    createdBy: { type: String }

}, { timestamps: true });

const Payment = new mongoose.model("payment", PaymentSchema);
module.exports = Payment;