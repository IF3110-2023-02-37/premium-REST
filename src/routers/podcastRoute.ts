const express = require('express')
const router = express.Router()
const podcastControl = require('../controllers/podcastControl')
import { Request, Response } from 'express';

// routing test to podcast
router.get('/', async ( req:Request, res:Response) => {
    await podcastControl.tes(req,res);
})

module.exports = router