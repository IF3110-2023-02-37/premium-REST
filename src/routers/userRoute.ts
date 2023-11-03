import { Request, Response } from 'express';
import { register } from '../controllers/userController'; // Import the register function

const express = require('express');
const router = express.Router();

// routing test to review
router.post('/register', register);

module.exports = router;
