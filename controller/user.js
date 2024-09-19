const userModel = require("../model/blog");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const updateUserInfo = async (req, res) => {
    // GET ID AND SPREAD OTHERS TO UPDATE ANY USER INFO

    const {password, ...others} = req.body;
    // const {user_token} = req.cookies;
    // const {id} = jwt.verify(user_token, process.env.JWT_SECRETE);
    const {id} = req.user;
    console.log(id);
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, others, {new: true});
        res.json(updatedUser);
    } catch (error) {
        console.log(error.message);
    }
};

const updatePassword = async (req, res) => {

    const {oldpassword, newpassword} = req.body;
    const {id} = req.user;
    try {
        // first step is to get the user by id
        const getUser =  await userModel.findById(id);
        // check if password match
        const verify = bcrypt.compareSync(oldpassword, getUser.password);
        if (!verify) {
            return res.json({message: "password does not match"});
        }
        // then we update our password
        await userModel.findByIdAndUpdate(id, {password: newpassword}, {new: true});
        res.json({message: "password has been updated"});
    } catch (error) {
        console.log(error.message);
    }
};


const deleteUser = async (req, res) => {
    // GET BY ID AND DELETE

    const {id} = req.user;
    try {
        await userModel.findByIdAndDelete(id);
        res.json({message: "user has been deleted successfully"});
    } catch (error) {
        console.log(error.message);
    }
};

const getUsers = async (req, res) => {
    try {
        const getall = await userModel.find();
        res.json(getall);
    } catch (error) {
        console.log(error.message);
    }
}

const updateRole = async (req, res) => {
    const {id} = req.body;
    const {role} = req.user;
    if (role !== "SuperAdmin" && role !== "Admin") {
        return res.json({error: "You don't have permission for this"});
    }
    try {
        await userModel.findByIdAndUpdate(id, {role: "Admin"}, {new: true});
        res.json({message: "Admin has been set"});
    } catch (error) {
        res.json({error: error.message});
    }
};

module.exports = { updateUserInfo, updatePassword, getUsers,
                deleteUser, updateRole    
};

