const {getuser}=require('../service/auth')

async function checkuserloggenin(req,res,next) {
    const useruuid=req.cookies?.uid;
    if(!useruuid){
        return res.redirect("/login");
    }
    const user=getuser(useruuid);

    if(!user) return res.redirect("/login");

    req.user=user;
    next();
}

async function checkauth(req,res,next) {
    const useruuid=req.cookies?.uid;
 
    const user=getuser(useruuid);

    req.user=user;
    next();
}

module.exports={
    checkuserloggenin,
    checkauth,
}