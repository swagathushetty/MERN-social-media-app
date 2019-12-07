const express = require('express')
const router = express.Router()
const bcrypt=require('bcryptjs')
const auth =require('../../middleware/auth')
const User=require('../../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator/check')

//@route  GET api/auth
//@desc   Test route
//@access public
router.get('/',auth,async(req, res) => {
    try{
        //select('-password') removes password from our data we get
       const user=await User.findById(req.user.id).select('-password')
       res.json(user)
    }catch(e){
        console.log(e.message);
        res.status(500).send('server error')
    }
})

//@route  POST api/auth
//@desc   authenticate user and get token
//@access public
router.post('/', [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email, password } = req.body;

    try {

        let user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
        }


        //return jsonwebtoken

        //for whom the token will be created
        const payload = {
            user: {
                id: user.id //in mongoose we can use id rather than _id
            }
        }
        
        //creating token
        jwt.sign(payload,
            config.get('jwtSecret'), { expiresIn: 360000 },
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({ token: token })
            }
        )
    } catch (e) {
        console.log(e.message)
        res.status(500).send('server error')
    }
})

module.exports=router;