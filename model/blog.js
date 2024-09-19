const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            enum: ["Basic", "Admin", "SuperAdmin"]
        }
    }, {timestamps: true}
);
const userModel = mongoose.model("user", schema);
module.exports = userModel;