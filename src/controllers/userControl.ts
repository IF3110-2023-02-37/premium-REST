import { Request, Response } from "express";
import prisma from "../prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  let { username, email, password, displayName } = req.body;

  if (!username || !email || !displayName || !password) {
    return res.status(400).json({ message: 'Blank field' });
  }

  const user = await prisma.user.findFirst ({
    where: {
      username
    }
  });

  if (user) {
    return res.status(400).json({ message: 'Username already existed' })
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        displayName,
      },
    });
    
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'User registration failed' })
  }
}

const login =async (req: Request, res: Response) => {
  const {username, password} = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    // payload -> data yang akan diberikan kepada user
    const payload = {
      username: user.username,
      email: user.email,
      role: user.role
    }

    const secret = process.env.JWT_SECRET;
    const hour = 1;
    const expiresIn = 60 * 60 * hour;

    const token = jwt.sign(payload, secret, {expiresIn: expiresIn})
    return res.json({
      user,
      token: token
    })
  } else {
    return res.status(403).json({ message: "Wrong password, try again" })
  }
}



export {register, login};