const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'suaSenhasecreta';

const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

const generateToken = (payload) =>
  jwt.sign(payload, jwtSecret, jwtConfig);

const authenticateToken = (req, res,next) => {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).json({ message: 'Token not found' })
    }
    
    jwt.verify(authorization, jwtSecret, (err, user) => {
        if(err){
            return res.status(401).json({message: 'Token must be a valid token' })
        }
     req.user = user;
     next();   
    })
}
module.exports = {
    authenticateToken,
    generateToken,
};