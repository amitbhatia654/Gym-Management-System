const moment = require("moment");
const Member = require('../Models/MembersModel')
const { calculateValidity } = require("../utils/CommonFunctions")



const addMember = async (req, res) => {
    try {
        const ValidTill = calculateValidity(req.body.doj, parseInt(req.body.memberPlan))
        let status = 'expire'
        const currentDate = new Date()
        if (currentDate < ValidTill) status = 'active'
        const data = { ...req.body, createdBy: req.loginUser._id, ValidTill, status, PlanRenew: req.body.doj }

        const result = await Member.create(data)
        res.status(200).json({ message: "New Member Added Succesfully", result })
    } catch (error) {
        res.status(400).send("Some Error Occured")
        console.log('New Member error', error)
    }
}

const updateMember = async (req, res) => {
    try {
        let PlanRenew = req.body.doj
        if (req.body.type == 'renew') PlanRenew = req.body.PlanRenew
        const ValidTill = calculateValidity(PlanRenew, parseInt(req.body.memberPlan))
        let status = 'expire'

        const currentDate = new Date()
        if (currentDate < ValidTill) status = 'active'

        const data = { ...req.body, ValidTill, status, PlanRenew }
        const result = await Member.findByIdAndUpdate(req.body._id, data, { new: true })

        res.status(200).json({ message: "Member updated succesfully", result })
    } catch (error) {
        res.status(205).send("Member Not Updated")
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

        const currentDate = new Date(); // Get the current date
        // Add validTill condition based on type
        if (type == "active") {
            query.ValidTill = { $gte: currentDate }; // Fetch records with ValidTill >= current date
        } else if (type == "expire") {
            query.ValidTill = { $lt: currentDate }; // Fetch records with ValidTill < current date
        }

        // Fetch members with pagination
        const response = await Member.find(query).skip(skip).limit(rowSize);
        // Count total documents for pagination
        const totalCount = await Member.countDocuments(query);

        res.status(200).json({ response, totalCount });
    } catch (error) {
        console.error("Error fetching members:", error); // Log the error for debugging
        res.status(500).send("Data not found");
    }
};


const getMembersReport = async (req, res) => {

    console.log('it called')
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

        if (type == "monthlyJoined") {
            const currentMonth = moment().month() + 1; // Get current month (moment months are 0-indexed)
            query["$expr"] = {
                $eq: [{ $month: "$doj" }, currentMonth] // Match documents where the month of DOJ equals current month
            };
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





module.exports = {
    addMember, getAllJoinedMembers, updateMember, deleteMember, getMembersReport
}