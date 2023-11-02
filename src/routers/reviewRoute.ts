const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')
import { Request, Response } from 'express';

// routing test to review
router.get('/test', async ( req:Request, res:Response) => {
    await reviewController.tes(req,res);
})

module.exports = router