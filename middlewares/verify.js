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

module.exports = {verify};