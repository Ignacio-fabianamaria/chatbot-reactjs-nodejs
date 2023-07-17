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
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({error: "Unauthorized"})
    }
    
    jwt.verify(token, jwtSecret, (err, user) => {
        if(err){
            return res.status(401).json({error: "Invalid token"})
        }
     req.user = user;
     next();   
    })
}
module.exports = {
    authenticateToken,
    generateToken,
};