import { Request, Response, NextFunction } from 'express';
import { register, login, updateProfile, deleteAccount, getAll, getPodcaster, getDataPodcaster } from '../controllers/userControl'; // Import the register function
import prisma from '../prismaClient';
import {accessValidation} from '../accessValidation/accessValidation';

const express = require('express');
const router = express.Router();
const userAccess = accessValidation(["user"]);

router.post('/register', register);
router.post('/login', login);
router.put('/:username', userAccess, updateProfile);
router.delete('/:username', userAccess, deleteAccount);
router.get('/getPodcaster', getPodcaster);
router.get('/getDataPodcaster/:username', getDataPodcaster);


// for testing
router.get('/', getAll)

module.exports = router;
