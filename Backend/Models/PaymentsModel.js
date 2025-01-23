const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({

    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    paymentMode: { type: String },
    memberPlan: { type: Number },
    planRenew: { type: Date },
    validTill: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId }

}, { timestamps: true });

const Payment = new mongoose.model("payment", PaymentSchema);
module.exports = Payment;