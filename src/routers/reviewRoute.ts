const express = require('express')
const router = express.Router()
const reviewControl = require('../controllers/reviewControl')
import { Request, Response } from 'express';

// routing test to review
router.get('/', async ( req:Request, res:Response) => {
    await reviewControl.tes(req,res);
})

module.exports = router