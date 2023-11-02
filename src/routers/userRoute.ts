const express = require('express')
const router = express.Router()
const userControl = require('../controllers/userControl')
import { Request, Response } from 'express';

// routing test to user
router.get('/', async ( req:Request, res:Response) => {
    await userControl.tes(req,res);
})

module.exports = router