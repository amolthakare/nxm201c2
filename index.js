const express = require("express");
const mongoose = require("mongoose");
const { authenticate } = require("../day-4/we/middlewares/authenticate");
require('dotenv').config();
const {connection} = require("./config/db");
const { autenticate } = require("./middleware/authenticate");
const { authorise } = require("./middleware/authorise");
const UserRoutes = require("./routes/user.model");


const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hello");
})
app.use("/",UserRoutes);
app.use("/goldrates",authenticate,(req,res)=>{
    res.send("goldrates page");
})
app.use("/userstats",authenticate,authorise(["manager"]),(req,res)=>{
    res.send("userstats");
})

app.get("/logout", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    const blacklisteddata = JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"))
    blacklisteddata.push(token)
    fs.writeFileSync("./blacklist.json", JSON.stringify(blacklisteddata))
    res.send("Logged out successfully")
})


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected");
    }
    catch(err){
        console.log(err);
    }
    console.log(`listening to port ${process.env.port}`)
})