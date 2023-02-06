const authorise = (role)=>{
    return(req,res,next)=>{
        const user = req.body.user;
        if(role.includes(user)){
            next();
        }
        else{
            res.send("you are not authorised");
        }
    }
}
module.exports={
    authorise
}