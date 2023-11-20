const express = require('express')
const router = express.Router()
const {userWelcome, userSignUp, userSignIn, getDashboard,uploadFile} = require('../Controllers/user.controller')

router.get('/welcome',userWelcome)
router.post('/signup',userSignUp)
router.post('/signin',userSignIn)
router.get('/dashboard',getDashboard)
router.post('/upload',uploadFile)

module.exports = router
