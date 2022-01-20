const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment