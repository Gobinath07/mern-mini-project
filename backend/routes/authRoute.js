const express = require('express');
const router=express.Router()
const useCon = require('../controllers/useCon')  
const auth=require('../middle/auth')

router.post('/register',useCon.register)
router.post('/activation',useCon.activateEmail)
router.post('/login',useCon.login)
router.post('/refresh_token',useCon.getAccessToken)
router.post('/forgot',useCon.forgotPassword)
router.get('/logout',useCon.logout)

router.get('/infor', auth, useCon.getUserInfor)

router.get('/all_infor', auth, useCon.getUsersAllInfor)


router.post('/reset',auth,useCon.resetPassword)
module.exports=router