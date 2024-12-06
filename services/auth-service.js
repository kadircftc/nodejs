require("dotenv").config();

const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; 
    if (!token) {
        return res.redirect('/login');
    }
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => { 
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        req.userId = decoded.id; 
        next();
    });
};
module.exports=verifyToken;