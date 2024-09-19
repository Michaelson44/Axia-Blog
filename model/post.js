const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    previewPic: {
        type: String,
        required: true
    },
    detailsPic: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    },
    likes: {
        type: [String],
        default: [],
        ref: "user"
    },
    comments: {
        type: [mongoose.Types.ObjectId],
        default: [],
        ref: "comments"
    }
    
}, {timestamps: true});

const postModel = mongoose.model("post", schema);
module.exports = postModel;