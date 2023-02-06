const jwt = require("jsonwebtoken");
require('dotenv').config();

const autenticate = (req,res,next)=>{
    const token = req.headers.autenticate?.split(" ")[1];
    if(token){
        const decode = jwt.verify(token,process.env.key);
        if(decode){
            next();
        }
        else{
            res.send("login in again");
        }
    }
    else{
        res.send("plz login again");
    }
}
module.exports={
    autenticate
}