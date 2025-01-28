const moment = require("moment");
const Member = require('../Models/MembersModel')
const { calculateValidity } = require("../utils/CommonFunctions");
const Trainer = require("../Models/TrainerModel");
const Payment = require("../Models/PaymentsModel");
const MemberPlan = require("../Models/MembershipModel");


const addMember = async (req, res) => {

    try {
        let status = 'active'
        const validTill = calculateValidity(req.body.planRenew, parseInt(req.body.memberPlan))
        const currentDate = new Date()
        if (new Date(validTill) < currentDate) status = "inactive"

        const paymentData = {
            memberPlan: req.body.memberPlan,
            planRenew: req.body.planRenew,
            validTill,
            paymentMode: req.body.paymentMode,
            createdBy: req.loginUser._id,
        }

        const paymentResult = await Payment.create(paymentData)
        const memberData = {
            name: req.body.name,
            address: req.body.address,
            gender: req.body.gender,
            status,
            phone_number: req.body.phone_number,
            emergency_number: req.body.emergency_number,
            doj: req.body.doj,
            assigned_trainer: req.body.assigned_trainer,
            profilePic: req.body.profilePic,
            createdBy: req.loginUser._id,
            lastPayment: paymentResult._id
        }

        const memberResult = await Member.create(memberData)
        Payment.findByIdAndUpdate(paymentResult._id, { memberId: memberResult._id }, { new: true })
        res.status(200).json({ message: "New Member Added Succesfully", memberResult })
    } catch (error) {
        res.status(400).send("Some Error Occured")
        console.log('New Member error', error)
    }
}

const updateMember = async (req, res) => {
    try {
        let planRenew = req.body.planRenew
        const validTill = calculateValidity(planRenew, req.body.memberPlan)
        let status = 'active'
        const currentDate = new Date()

        if (new Date(validTill) < currentDate) status = 'inactive'

        const paymentData = {
            memberPlan: req.body.memberPlan,
            planRenew: req.body.planRenew,
            validTill,
            paymentMode: req.body.paymentMode,
        }

        var memberData = { ...req.body, status }
        if (req.body.type == 'edit') {
            await Payment.findByIdAndUpdate({ _id: req.body.lastPayment._id }, paymentData, { new: true })
        }

        else {
            var paymentResult = await Payment.create(paymentData)
            memberData.lastPayment = paymentResult._id
        }

        const memberResult = await Member.findByIdAndUpdate(req.body._id, memberData, { new: true })
            .populate({ path: 'assigned_trainer' }) // Populate assigned trainer
            .populate({ path: 'lastPayment' })



        res.status(200).json({ message: "Member updated succesfully", memberResult })
    } catch (error) {
        res.status(205).send("Member Not Updated")
        console.log(error, 'error')
    }
}

const deleteMember = async (req, res) => {
    try {
        const deletedEmployee = await Member.findOneAndDelete({ _id: req.body.memberId });
        if (!deletedEmployee) {
            return res.status(404).send({ message: 'Member not deleted' });
        }
        res.status(200).send({ message: 'Member deleted successfully', data: deletedEmployee });

    } catch (error) {
        console.error('Error deleting Member:', error);
        res.status(500).send({ message: 'Failed to delete Memeber' });
    }
};

// const currentDate = new Date(); // Get the current date
// // Add validTill condition based on type
// if (type == "active") {
//     query.ValidTill = { $gte: currentDate }; // Fetch records with ValidTill >= current date
// } else if (type == "expire") {
//     query.ValidTill = { $lt: currentDate }; // Fetch records with ValidTill < current date
// }

const getAllJoinedMembers = async (req, res) => {
    try {
        let search = req.query.search;
        let rowSize = parseInt(req.query.rowSize) || 8;
        let page = parseInt(req.query.currentPage) || 1; // Default to page 1
        let skip = (page - 1) * rowSize;
        const createdBy = req.loginUser._id;
        const type = req.query.type;

        // Base query
        let query = { createdBy };

        // Add search condition for name or contactNumber
        if (search) {
            const searchRegex = new RegExp(`^${search}`, "i"); // Match starting with search (case-insensitive)
            query.$or = [
                { name: { $regex: searchRegex } }, // Search in the name field
                { $expr: { $regexMatch: { input: { $toString: "$phone_number" }, regex: searchRegex } } } // Match starting digits in phone_number
            ];
        }

        // Fetch members with populated fields
        const members = await Member.find(query)
            .populate({ path: 'assigned_trainer' }) // Populate assigned trainer
            .populate({ path: 'lastPayment' }) // Populate last payment
            .skip(skip)
            .limit(rowSize);

        // Filter members based on the `type` and `validTill`
        const currentDate = new Date();
        let filteredMembers = members;

        if (type === "active") {
            filteredMembers = members.filter(
                (member) => member.lastPayment && new Date(member.lastPayment.validTill) >= currentDate
            );
        } else if (type === "inactive") {
            filteredMembers = members.filter(
                (member) => member.lastPayment && new Date(member.lastPayment.validTill) < currentDate
            );
        }

        // Count total documents for pagination
        const totalCount = filteredMembers.length;

        res.status(200).json({ response: filteredMembers, totalCount });
    } catch (error) {
        console.error("Error fetching members:", error); // Log the error for debugging
        res.status(500).send("Data not found");
    }
};



const getMembersReport = async (req, res) => {

    try {
        let search = req.query.search;
        let rowSize = parseInt(req.query.rowSize) || 8;
        let page = parseInt(req.query.currentPage) || 1; // Default to page 1
        let skip = (page - 1) * rowSize;
        const createdBy = req.loginUser._id;
        const type = req.query.type;

        // Base query
        let query = { createdBy };

        // Add search condition for name or contactNumber
        if (search) {
            const searchRegex = new RegExp(`^${search}`, "i"); // Match starting with search (case-insensitive)
            query.$or = [
                { name: { $regex: searchRegex } }, // Search in the name field
                { $expr: { $regexMatch: { input: { $toString: "$phone_number" }, regex: searchRegex } } } // Match starting digits in phone_number
            ];
        }

        if (type == "joined") {
            const currentMonth = moment().month() + 1; // Get current month (moment months are 0-indexed)
            query["$expr"] = {
                $eq: [{ $month: "$doj" }, currentMonth] // Match documents where the month of DOJ equals current month
            };
        }

        else if (type == 'expired') {
            const currentMonth = moment().month() + 1; // Get current month (moment months are 0-indexed)
            query["$expr"] = {
                $eq: [{ $month: "$ValidTill" }, currentMonth] // Match documents where the month of DOJ equals current month
            };
        }

        else if (type == 'expireIn3') {
            const currentDate = moment().startOf('day'); // Start of today, to ignore the time part
            const threeDaysFromNow = moment().add(3, 'days').endOf('day'); // End of the day, 3 days from today

            query["$expr"] = {
                $and: [
                    { $gte: ["$ValidTill", currentDate.toDate()] }, // Match documents where ValidTill is greater than or equal to today
                    { $lte: ["$ValidTill", threeDaysFromNow.toDate()] } // Match documents where ValidTill is less than or equal to three days from today
                ]
            };

            // Add sorting by ValidTill in ascending order
            // query["$sort"] = { "ValidTill": 1 };
        }

        else if (type == 'expireIn7') {
            const currentDate = moment(); // Get the current date
            const threeDaysFromNow = moment().add(7, 'days'); // Get the date three days from today

            query["$expr"] = {
                $and: [
                    { $gte: ["$ValidTill", currentDate.toDate()] }, // Match documents where ValidTill is greater than or equal to today
                    { $lte: ["$ValidTill", threeDaysFromNow.toDate()] } // Match documents where ValidTill is less than or equal to three days from today
                ]
            };

            // query["$sort"] = { "ValidTill": 1 };
        }
        // Fetch members with pagination
        const response = await Member.find(query).skip(skip).limit(rowSize);
        // Count total documents for pagination

        // console.log(response, 'api repos')
        const totalCount = await Member.countDocuments(query);

        res.status(200).json({ response, totalCount });
    } catch (error) {
        console.error("Error fetching members:", error); // Log the error for debugging
        res.status(500).send("Data not found");
    }
};


const addTrainer = async (req, res) => {
    try {

        const data = { ...req.body, createdBy: req.loginUser._id }
        const result = await Trainer.create(data)
        res.status(200).json({ message: "New Trainer Added Succesfully", result })
    } catch (error) {
        res.status(400).send("Some Error Occured")
        console.log('error in adding trainer', error)
    }
}

const getAllTrainers = async (req, res) => {
    try {
        let search = req.query.search;
        let rowSize = parseInt(req.query.rowSize) || 8;
        let page = parseInt(req.query.currentPage) || 1; // Default to page 1
        let skip = (page - 1) * rowSize;
        const createdBy = req.loginUser._id;

        // Base query
        let query = { createdBy };

        // Add search condition for name or contactNumber
        if (search) {
            const searchRegex = new RegExp(`^${search}`, "i"); // Match starting with search (case-insensitive)
            query.$or = [
                { name: { $regex: searchRegex } }, // Search in the name field
                { $expr: { $regexMatch: { input: { $toString: "$phone_number" }, regex: searchRegex } } } // Match starting digits in phone_number
            ];
        }



        // Fetch members with pagination
        const response = await Trainer.find(query).skip(skip).limit(rowSize);
        // Count total documents for pagination
        const totalCount = await Trainer.countDocuments(query);

        res.status(200).json({ response, totalCount });
    } catch (error) {
        console.error("Error fetching members:", error); // Log the error for debugging
        res.status(500).send("Data not found");
    }
};


const updateTrainer = async (req, res) => {
    try {
        const data = { ...req.body }
        const result = await Trainer.findByIdAndUpdate(req.body._id, data, { new: true })

        res.status(200).json({ message: "Trainer updated succesfully", result })
    } catch (error) {
        res.status(205).send("Trainer Not Updated")
    }
}


const deleteTrainer = async (req, res) => {
    try {
        const deletedTrainer = await Trainer.findOneAndDelete({ _id: req.body.trainerId });
        if (!deletedTrainer) {
            return res.status(404).send({ message: 'Trainer not deleted' });
        }
        res.status(200).send({ message: 'Trainer deleted successfully', data: deletedTrainer });

    } catch (error) {
        console.error('Error deleting Member:', error);
        res.status(500).send({ message: 'Failed to delete Memeber' });
    }
};


const getAllTrainersList = async (req, res) => {
    try {

        const createdBy = req.loginUser._id;
        let query = { createdBy };
        const response = await Trainer.find(query)

        res.status(200).json({ response });
    } catch (error) {
        console.error("Error fetching trainers list:", error); // Log the error for debugging
        res.status(500).send("Data not found");
    }
};

// to fetch all members list under the trainer
const getAllMembersList = async (req, res) => {
    try {

        let query = { assigned_trainer: req.query.trainerId };
        const response = await Member.find(query)

        res.status(200).json({ response });
    } catch (error) {
        console.error("Error fetching trainers list:", error); // Log the error for debugging
        res.status(500).send("Data not found");
    }
};


const addMembershipPlans = async (req, res) => {
    try {
        const data = { ...req.body, createdBy: req.loginUser._id }
        const result = await MemberPlan.create(data)
        res.status(200).json({ message: "New Plan Added Succesfully", result })
    } catch (error) {
        res.status(400).send("Some Error Occured")
        console.log('error in adding trainer', error)
    }
}


const getAllMemberPlans = async (req, res) => {
    try {
        const createdBy = req.loginUser._id;
        // Base query
        let query = { createdBy };
        const response = await MemberPlan.find(query);
        res.status(200).json({ response });
    } catch (error) {
        console.error("Error fetching membership plans:", error); // Log the error for debugging
        res.status(500).send(" something Wrong ! Plan Not Deleted ");
    }
};

const deleteMemberPlan = async (req, res) => {
    try {
        console.log(req.body, 'body is ')
        const deletedTrainer = await MemberPlan.findOneAndDelete({ _id: req.body.planId });
        if (!deletedTrainer) {
            return res.status(404).send({ message: 'Plan not deleted' });
        }
        res.status(200).send({ message: 'Plan deleted successfully', data: deletedTrainer });

    } catch (error) {
        console.error('Error deleting Member:', error);
        res.status(500).send({ message: 'Failed to delete Memeber' });
    }
};


module.exports = {
    addMember, getAllJoinedMembers, updateMember, deleteMember, getMembersReport, addTrainer,
    getAllTrainers, updateTrainer, deleteTrainer, getAllTrainersList, getAllMembersList, addMembershipPlans,
    getAllMemberPlans, deleteMemberPlan
}