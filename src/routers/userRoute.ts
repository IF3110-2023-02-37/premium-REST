import { Request, Response, NextFunction } from 'express';
import { register, login, updateProfile, deleteAccount } from '../controllers/userControl'; // Import the register function
import prisma from '../prismaClient';
import accessValidation from '../accessValidation';
// import multer from 'multer';

const express = require('express');
const router = express.Router();
const userAccess = accessValidation(["user"]);

router.post('/register', register);
router.post('/login', login);
router.put('/update/:username', userAccess, updateProfile);
router.delete('/delete/:username', userAccess, deleteAccount);

// for testing
router.get('/getAll', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
})

module.exports = router;
