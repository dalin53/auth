const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('./model/user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const {auth} = require('./middleware/auth')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/user', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });

    user.save((err, doc) => {
        if(err) res.status(400).send(err.message);
        res.status(200).send(doc);
    })
})

app.post('/api/user/login',(req, res) => {
    User.findOne({email: req.body.email},function (err, user) {
        if(!user) res.json({message:'User not found!'});
        user.comparePWD(req.body.password, (err, isMatch) => {
            if(err) throw err;
            if(!isMatch) return res.status(400).json({message: 'Invalid PWD!'})
            user.genToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie("auth", user.token).send('ook');
            })
        }) 
    })
})

app.get('/api/user/profile', auth, (req, res) => {
    res.status(200).send(req.token);
})


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));