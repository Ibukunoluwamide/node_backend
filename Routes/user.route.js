const express = require('express')
const router = express.Router()
const {userWelcome, userSignUp, userSignIn, getDashboard} = require('../Controllers/user.controller')

router.get('/welcome',userWelcome)
router.post('/signup',userSignUp)
router.post('/signin',userSignIn)
router.get('/dashboard',getDashboard)

module.exports = router
