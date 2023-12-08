const express= require('express')

//contoroller fun
const{signupUser, loginUser}=require('../controller/userController') 

const router= express.Router()
// login
router.post('/login',loginUser)


// signup
router.post('/signup',signupUser)


module.exports=router