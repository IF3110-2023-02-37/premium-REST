const express = require('express')
const router = express.Router()
import { createReview, getReview } from '../controllers/reviewControl';
import { Request, Response } from 'express';
import accessValidation from '../accessValidation';

const userAccess = accessValidation(["user"]);

// Example routes with role-based access control
// router.get("/admin-only", adminAccess, (req: Request, res: Response) => {
//   res.send("This route is for admin only.");
// });

// router.get("/user-only", userAccess, (req: Request, res: Response) => {
//   res.send("This route is for regular users.");
// });

router.get("/getreview/:username/:podcastid", userAccess, getReview);
router.post("/postreview", createReview);

module.exports = router;