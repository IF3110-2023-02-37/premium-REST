const express = require('express')
const router = express.Router()
const reviewControl = require('../controllers/reviewControl')
import { Request, Response } from 'express';
import accessValidation from '../accessValidation';

const adminAccess = accessValidation(["admin"]);
const userAccess = accessValidation(["user"]);

// Example routes with role-based access control
router.get("/admin-only", adminAccess, (req: Request, res: Response) => {
  res.send("This route is for admin only.");
});

router.get("/user-only", userAccess, (req: Request, res: Response) => {
  res.send("This route is for regular users.");
});

module.exports = router;