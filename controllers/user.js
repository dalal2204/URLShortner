const user = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setuser } = require('../service/auth')

async function handleusersighup(req, res) {
    const { name, email, password, Securityq } = req.body;
    await user.create({
        name,
        email,
        password,
        Securityq,
    })
    return res.redirect("/");
}



async function handleuserlogin(req, res) {
    const { email, password } = req.body;
    const user1 = await user.findOne({ email, password });
    if (!user1) {
        return res.render("login", {
            error: "Invalid Username Or Password",
        });
    }
    const token = setuser(user1);
    res.cookie("uid", token);
    return res.redirect("/");
}

async function forgotuserpass(req, res) {
    const { email, Securityq } = req.body;
    const user1 = await user.findOne({ email, Securityq });
    if (!user1) {
        return res.render("login", {
            error: "Invalid Username Or Securityq",
        });
    }
    else {
        return res.render("updatepass");
    }
}

async function updateuserpass(req, res) {
    const { email, newPassword } = req.body;
    const user1 = await user.findOneAndUpdate(
        { email },
        { password: newPassword },
        { new: true }
    );
    if (!user1) {
        return res.render("login", {
            error: "Invalid Username",
        });
    }
    else {
        return res.render("login");
    }
}

async function handlelogout(req, res) {
    res.cookie('uid', ' ', { maxAge: 1 })
    return res.render("login");
}

module.exports = {
    handleusersighup,
    handleuserlogin,
    forgotuserpass,
    updateuserpass,
    handlelogout,
};
