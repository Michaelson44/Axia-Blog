const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    
    const {user_token} = req.cookies;
    if (!user_token) {
        return res.json({message: "you are not authenticated"})
    }
    jwt.verify(user_token, process.env.JWT_SECRETE, (err, info) => {
        if (err) {
            return res.json({error: err.message});
        } 
        req.user = info;
    })
    next();
}

// const testjwt = (req, res, next) => {
//     const data = "testing jwt";
//     const token = jwt.sign(data, process.env.JWT_SECRETE);
    

//     const verify = jwt.verify(token, process.env.JWT_SECRETE, (err, info) => {
//         if (err) {
//             return res.json(err);
//         } else {
//             return res.json(info);
//         }
//     })
//     console.log(verify);
//     res.json(verify);
//     next();
// }

const register = async (req, res) => {
    // get the body and save 
    const {password, ...others} = req.body;
    // hash the password
    const salt = brcypt.genSaltSync(10);
    const hashedp = bcrypt.hashSync(password, salt);
    // now create a new instance of user model
    const user = new userModel({...others}, {password: hashedp,});
    try {
        await user.save();
        res.json({message: "user created successfully"});
    } catch (error) {
        res.json(error.message);
    }
    
}
const login = async (req, res) => {
    // get the email and password from user
    const {email, password} = req.body;
    // get user by email, check if they exist
    const user = await userModel.findOne({email});
    if (!user) {
        return res.json({error: "user does not exist"});
    }
    // then check if password is correct
    const verify = bcrypt.compareSync(password, user.password);
    if(!verify) return res.json({error: "password invalid"});
    
    const username = {name: user.username};
    const token = jwt.sign(username, process.env.JWT_SECRETE);

    res.cookies("test_token", token);
    res.json({message: "user logged in successfully"});

}

const updateInfo = async (req, res) => {
    // get the password from body
    const {password, ...others} = req.body;
    // get token from cookies
    const {test_token} = req.cookies;
    // verify token to access user info
    const {id} = jwt.verify(test_token, process.env.JWT_SECRETE)
    try {
        await userModel.findByIdAndUpdate(id, others, {new: true});
        res.json({message: "update successful"})
    } catch (error) {
        res.json(error.message);
    }

    // set a cookie
    const token = jwt.sign(obj, process.env.secrete);
    // we can set cookie on anything. Might be a string, number, anything bro. 
    // doesn't have to be a token only 
    res.cookies('test_cookie', token);
    // this is basically how you set a cookie

    // getting something like id from cookie so user wont have to pass them
    const {test_cookie} = req.cookies;
    // we can just destructure the data we need from verified jwt
    const {hid} = jwt.verify(test_cookie, process.env.secrete, (err, info) => {});
}

// okay bro.. we starting a new code noe from scratch
const testing = (req, res, next) => {
    // God is talking to me
    // now set a cookie
    
    const data = "something to just sign";
    const secret = "jxoco9cytactcowilchasich7cgp"

    const gottoken = jwt.sign(data, secret, {expiration: "2h"});

    res.cookies("new_token", gottoken);
    res.json({message: "got our cookie"});

    // God told me to drink water daily ;
    // now verify your token ;

    const verify = jwt.verify(gottoken, secret, (err, info) => {
        if (err) {
            return res.json({error: err.message});
        } else {
            return res.json({message: info});
        }
    });

}

module.exports = {verify};