import { Request, Response } from 'express';

const tes = async (req: Request, res: Response) => {
    try {
      res.json({
        success: true,
        message: "You arrive at subs"
      });
    } catch (e) {
      res.status(400).json({ message: "ada yang salah bang" });
    }
  };

module.exports = {
  tes,
};