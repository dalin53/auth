const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// bcrypt.genSalt(10, (err, salt) => {
//     if(err) return next(err);
//     bcrypt.hash('Dalin168!',salt, (err, hash) => {
//         if(err) return next(err);
//         console.log(hash)
//     })
// })
const id ='1000';
const secret = 'suprtsecret';
const decToken ='eyJhbGciOiJIUzI1NiJ9.MTAwMA.RZHyAFqbezByMP-pq_XNQbcaBecTmuhLPtKwqUSKcxs';
const token = jwt.sign(id, secret);
const decodeToken = jwt.verify(decToken, secret);

console.log(decodeToken)