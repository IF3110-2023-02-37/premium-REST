const express = require('express')
const router = express.Router()
const subsControl = require('../controllers/subsControl')
import { Request, Response } from 'express';

// routing test to subs
router.get('/', async ( req:Request, res:Response) => {
    await subsControl.tes(req,res);
})

module.exports = router