const Employee = require("../Models/EmployeeModel")
const moment = require("moment");


const Member = require('../Models/MembersModel')
const { calculateValidity } = require("../utils/CommonFunctions")
const AddEmployee = async (req, res) => {

    try {
        const { empName, empEmail, empPhone, empDepartment, empAddress, _id } = req.body
        const Res = await Employee.create({ empName, empPhone, empEmail, empDepartment, empAddress, createdBy: _id })
        res.status(200).send("New Member Added Succesfully")
    } catch (error) {
        console.log('Add Employee error', error)
    }
}



const addMember = async (req, res) => {
    try {

        const ValidTill = calculateValidity(req.body.doj, parseInt(req.body.memberPlan))
        const data = { ...req.body, createdBy: req.loginUser._id, ValidTill }

        const result = await Member.create(data)
        res.status(200).json({ message: "New Member Added Succesfully", result })
    } catch (error) {
        res.status(400).send("Some Error Occured")
        console.log('New Member error', error)
    }
}

const updateMember = async (req, res) => {
    try {
        const ValidTill = calculateValidity(req.body.doj, parseInt(req.body.memberPlan))
        const data = { ...req.body, ValidTill }
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

// const getAllJoinedMembers = async (req, res) => {
//     try {
//         let search = req.query.search
//         let rowSize = parseInt(req.query.rowSize) || 6;
//         let page = parseInt(req.query.currentPage) || 1; // Default to page 1
//         let skip = (page - 1) * rowSize;
//         const createdBy = req.loginUser._id
//         const type = req.query.type

//         const query = search
//             ? { createdBy, name: { $regex: search, $options: "i" } }
//             : { createdBy };

//         const response = await Member.find(query).skip(skip).limit(rowSize)
//         const totalCount = await Member.countDocuments(query);

//         res.status(200).json({ response, totalCount })

//     } catch (error) {
//         res.status(205).send("data not found")
//     }
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

        const currentDate = moment().toDate();
        // Add validTill condition based on type
        if (type == "joined") {
            query.$expr = {
                $gte: [
                    { $dateFromString: { dateString: "$ValidTill", format: "%d-%m-%Y" } },
                    currentDate,
                ],
            }; // Fetch records with validTill >= current date
        } else if (type == "inactive") {
            query.$expr = {
                $lt: [
                    { $dateFromString: { dateString: "$ValidTill", format: "%d-%m-%Y" } },
                    currentDate,
                ],
            }; // Fetch records with validTill < current date
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


const getAllEmployee = async (req, res) => {
    try {
        let search = req.query.search
        let rowSize = parseInt(req.query.rowSize) || 6;
        let page = parseInt(req.query.currentPage) || 1; // Default to page 1
        let skip = (page - 1) * rowSize;
        const createdBy = req.query._id

        const query = search
            ? { createdBy, empName: { $regex: search, $options: "i" } }
            : { createdBy };

        const response = await Employee.find(query).skip(skip).limit(rowSize)
        const totalCount = await Employee.countDocuments(query);

        res.status(200).json({ response, totalCount })

    } catch (error) {
        res.status(205).send("data not found")
    }
}


module.exports = {
    AddEmployee, getAllEmployee, addMember, getAllJoinedMembers, updateMember, deleteMember
}