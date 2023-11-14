import { Request, Response, NextFunction } from 'express';
import { register, login, updateProfile, deleteAccount, getAll } from '../controllers/userControl'; // Import the register function
import prisma from '../prismaClient';
import {accessValidation} from '../accessValidation/accessValidation';
// import multer from 'multer';

const express = require('express');
const router = express.Router();
const userAccess = accessValidation(["user"]);

router.post('/register', register);
router.post('/login', login);
router.put('/:username', userAccess, updateProfile);
router.delete('/:username', userAccess, deleteAccount);

// for testing
router.get('/getAll', getAll)

module.exports = router;
