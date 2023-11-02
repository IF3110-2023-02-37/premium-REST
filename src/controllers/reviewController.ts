const express = require('express')
const router = express.Router()
import { Request, Response } from 'express';

const tes = async (req: Request, res: Response) => {
    try {
      res.json({
        success: true,
        message: "You arrive at the destination, review"
      });
    } catch (e) {
      res.status(400).json({ message: "ada yang salah bang" });
    }
  };


  export default {
    tes
  };