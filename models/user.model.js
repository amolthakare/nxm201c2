const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    pass : String,
    role : {type : String, enum : ["customer", "manager"], default : "customer"},
}) 

const UserModel = mongoose.model("c2users",userSchema);

module.exports={
    UserModel,
}