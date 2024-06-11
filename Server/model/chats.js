const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    senderId: String,
    recipientId: String,
    messageText: String,
    createdAt: {
        type:Date,
        default:Date.now
    },
})

const Chat = mongoose.model('chat', chatSchema)
module.exports = Chat