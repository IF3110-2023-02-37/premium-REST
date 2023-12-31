import multer from "multer"

const express = require('express')
const router = express.Router()
// import multer from "multer"

//routing to admin (acc/rej subs)
// const adminRoute = require('./adminRoute')

//routing to podcast service
const podcastRoute = require('./podcastRoute')
router.use('/podcast', podcastRoute)

//routing to review
const reviewRoute = require('./reviewRoute')
router.use('/review', reviewRoute)

//routing to user (crud podcaster)
const userRoute = require('./userRoute')
router.use('/user', userRoute)

//routing to admin (acc/rej subs)
// const adminRoute = require('./adminRoute')
// router.use('/admin', adminRoute)

// routing to subscription
const subsRoute = require('./subsRoute')
router.use('/subs', subsRoute)

const uploadRoute = require('./uploadRoute')
router.use('/upload', uploadRoute)

const path = require('path');
router.use('/audio',  express.static(path.join(__dirname, '../public/audio')));
router.use('/cover',  express.static(path.join(__dirname, '../public/image/cover')));
router.use('/profile',  express.static(path.join(__dirname, '../public/image/profile')));


export default router