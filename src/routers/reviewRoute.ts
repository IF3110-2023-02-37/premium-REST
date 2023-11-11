const express = require('express')
const router = express.Router()
import { createReview } from '../controllers/reviewControl';
import { Request, Response } from 'express';
import accessValidation from '../accessValidation';

const adminAccess = accessValidation(["admin"]);
const userAccess = accessValidation(["user"]);

// Example routes with role-based access control
// router.get("/admin-only", adminAccess, (req: Request, res: Response) => {
//   res.send("This route is for admin only.");
// });

// router.get("/user-only", userAccess, (req: Request, res: Response) => {
//   res.send("This route is for regular users.");
// });

router.get("/getreview/:username/:podcastid", userAccess, );

router.post("/postreview", createReview);

module.exports = router;