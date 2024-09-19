const userModel = require('../model/blog');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {

    // GET PASSWORD FROM BODY AND SPREAD OTHERS
    const {password, role, ...others} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // CREATE A NEW INSTANCE OF USER MODEL TO REGISTER USER
    const newUser = new userModel({...others, password: hashedPassword, role: "Basic"});
    try {
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        console.log(error.message);
    };
};

const login = async (req, res) => {
    
    const {email, password} = req.body;
    // CHECK IF USER EXISTS 
    try {
        const userInfo = await userModel.findOne({email});
        if (!userInfo) {
            return res.json({error: "user does not exist"});
        }
        // CHECK / VERIFY IF PASSWORD IS CORRECT
        const verify = bcrypt.compareSync(password, userInfo.password);
        if (!verify) {
            return res.json({message: "password does not match"});
        }
        const aboutUser = {id: userInfo.id, role: userInfo.role};
        const token = jwt.sign(aboutUser, process.env.JWT_SECRETE);
        console.log(token);
        
        res.cookie("user_token", token);
        res.json({message: "user logged in successfully"});
    } catch (error) {
        console.log(error.message);
    }
};

const testjwt = async (req, res) => {
    const {token} = req.body;
    const info = jwt.verify(token, process.env.JWT_SECRETE, (err, info) => {
        if (err) {
            console.log(err);
            res.json({error: err.message});
        } else {
            console.log(info);
            res.json(info);
        }
    })
}

module.exports = {register, login, testjwt};