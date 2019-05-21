const {User} = require('../model/user');


let auth = (req, res, next) => {
    let token = req.cookies.auth;
    console.log(token)
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.status(401).send('Access denied!');
        req.token = token;
        next();
    })
   
}

module.exports = {auth}