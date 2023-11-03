import { Request, Response } from 'express';
import { register, login } from '../controllers/userControl'; // Import the register function
import prisma from '../prismaClient';

const express = require('express');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

// for testing
router.get('/getAllUser',async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
})

module.exports = router;
