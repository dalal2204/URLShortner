const express = require('express');
const user = require('../models/user');
const router = express.Router();
const { handleusersighup, handleuserlogin, forgotuserpass,updateuserpass,handlelogout } = require('../controllers/user')


router.post("/signin", handleusersighup);
router.post("/login", handleuserlogin);
router.post("/logout", handlelogout);
router.post("/forgot", forgotuserpass);
router.post("/update",updateuserpass);

module.exports = router;