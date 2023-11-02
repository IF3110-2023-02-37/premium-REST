const express = require('express')
const router = express.Router()
const adminControl = require('../controllers/adminControl')
import { Request, Response } from 'express';

// routing test to admin
router.get('/', async ( req:Request, res:Response) => {
    await adminControl.tes(req,res);
})

module.exports = router