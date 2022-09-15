const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/middleware');
const JWT_SECRET = 'HelloWorld';
router.post('/createuser', [
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').isLength({ min: 3 }),
], async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,

        })
        const data = {
            user:{
                id: user.id,
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        //console.log(jwtData);
        success = true;
        res.json({success,authToken});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Error Occ");
    }

    //    .then(user => res.json(user)).catch(err=>console.log(err)+
    //    res.json({error:"please enter a unique val"}));

});


//authenticating user
router.post('/loginuser', [
    body('email', 'enter valid email').isEmail(),
    body('password','password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Wrong Credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Wrong Credentials"});
        }
        const data = {
            user:{
                id:user.id,
            }
        }
        success = true
        const authToken = await jwt.sign(data,JWT_SECRET);
        res.send({success,authToken});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Error Occ");
    }
})
//fetching logged in user
router.post('/getuser',fetchuser, async (req, res) => {   
   try{
     userId = req.user.id;
     const user = await User.findById(userId).select("-password");
     res.send(user);
   }
   catch(error){
    console.error(error.message);
    res.status(500).send("Error Occ");
   }
})
module.exports = router;