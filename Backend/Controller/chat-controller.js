const { default: mongoose } = require("mongoose");
const conversation = require("../Models/convertsationModel");
const Message = require("../Models/MessagesModel");

const newUser = async (req, res) => {
    try {
        const senderId = req.userDetail._id;
        const recieverId = req.body.recieverId;

        let chats = await conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        }).populate({
            path: "participants",
            select: "-password -profilePic"
        });

        if (!chats) {
            const result = await conversation.create({
                participants: [senderId, recieverId]
            })
        }
        res.status(200).send("Called")
    } catch (error) {
        console.log(error)
        res.status(205).send(error)
    }

}




const getAllChats = async (req, res) => {
    try {
        const senderId = req.userDetail._id;
        let chats = await conversation.find({
            participants: { $in: [senderId] }
        }).populate({
            path: "participants",
            select: "-password -profilePic"
        }).populate('messages');

        res.status(200).send({ message: "result found", chats })

    } catch (error) {
        console.log(error)
        res.status(205).send(error)
    }

}


const SendMessage = async (req, res) => {
    try {
        const senderId = req.userDetail._id;
        const receiverId = req.body.receiverId;
        const m1 = await Message.create({ receiverId, senderId, message: req.body.message })

        let chats = await conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate({
            path: "participants",
            select: "-password -profilePic"
        }).populate('messages');


        if (m1) {
            chats.messages.push(m1)
            await chats.save();
        }

        console.log(chats, 'chats')
        res.status(200).send({ message: "message send", chats })
    } catch (error) {
        console.log(error, 'error')
        res.status(205).send(error)
    }
}

module.exports = { newUser, SendMessage, getAllChats }