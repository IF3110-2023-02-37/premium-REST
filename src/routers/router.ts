const express = require('express')
const router = express.Router()

//routing to admin (acc/rej subs)
const adminRoute = require('./adminRoute')

//routing to podcast service
const podcastRoute = require('./podcastRoute')

//routing to review
const reviewRoute = require('./reviewRoute')

//routing to subscription
const subsRoute = require('./subsRoute')

//routing to user (crud podcaster)
const userRoute = require('./userRoute')

router.use('/admin', adminRoute)
router.use('/podcast', podcastRoute)
router.use('/review', reviewRoute)
router.use('/subs', subsRoute)
router.use('/user', userRoute)


module.exports = router