const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const commentsSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Comment = module.exports = mongoose.model("Comment", commentsSchema);