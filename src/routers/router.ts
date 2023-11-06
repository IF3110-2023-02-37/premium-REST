const express = require('express')
const router = express.Router()

//routing to admin (acc/rej subs)
// const adminRoute = require('./adminRoute')

//routing to podcast service
const podcastRoute = require('./podcastRoute')
router.use('/podcast', podcastRoute)

//routing to review
// const reviewRoute = require('./reviewRoute')

//routing to user (crud podcaster)
const userRoute = require('./userRoute')
router.use('/user', userRoute)

//routing to admin (acc/rej subs)
// const adminRoute = require('./adminRoute')
// router.use('/admin', adminRoute)

//routing to subscription
// const subsRoute = require('./subsRoute')
// router.use('/subs', subsRoute)


export default router