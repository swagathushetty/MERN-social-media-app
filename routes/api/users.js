const express=require('express')
const router=express.Router()
const gravatar=require('gravatar')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const config=require('config')
const {check,validationResult} =require('express-validator/check')

const User=require('../../models/User')

//@route  POST api/users
//@desc   Register user
//@access public
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','please include a valid email').isEmail(),
    check('password','please enter password with more than 6 characters').isLength({min:6})
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
        console.log(req.headers)

    const {name,email,password}=req.body;
    
    try{
     //see if the user exists
    let user = await User.findOne({ email: email })
     
    //if record exists in DB
    if (user) {
        return res.status(400).json({ errors: [{ msg: "user already exists" }] });
    }

     //get users gravatar
     const avatar=gravatar.url(email,{
         s:'200', //size
         r:'pg',  //rating of image
         d:'mm'   //gives a default image
     })
    user=new User({
        name,
        email,
        avatar,
        password
    })
     //encrpyt password 
     const salt=await bcrypt.genSalt(10) // 10-no of rounds.more the better
     
     user.password=await bcrypt.hash(password,salt); //coverts to hash pass

     await user.save();

     //return jsonwebtoken

     //for whom the token will be created
     const payload={
         user:{
             id:user.id //in mongoose we can use id rather than _id
         }
     }
     
     //creating token
     jwt.sign(payload,
        config.get('jwtSecret'),{expiresIn:360000},
        (err,token)=>{
            if(err){
                throw err;
            }
            res.json({token:token})
        }
     )
    }catch(e){
        console.log(e.message)
        res.status(500).send('server error')
    }
})

module.exports=router;