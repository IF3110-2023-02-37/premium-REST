const express = require('express')
const router = express.Router()
import prisma from '../prismaClient';
import { createReview, getReview } from '../controllers/reviewControl';
import { Request, Response } from 'express';
import {accessValidation} from '../accessValidation/accessValidation';

const userAccess = accessValidation(["user"]);

router.get("/:username" , userAccess, getReview);
router.post("/", createReview);

router.get("/", async (req: Request, res: Response) => {
  const reviews = await prisma.review.findMany({include: {
    podcast: {
      select: {
        id: true,
        title: true
      },
    },
  },});
  return res.json(reviews);
})

module.exports = router;
