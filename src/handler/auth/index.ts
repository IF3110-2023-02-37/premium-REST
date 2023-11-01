import { Request, Response } from "express";
import prisma from "../../prismaClient";
import bcrypt from "bcrypt";

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
    
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'User registration failed' })
  }
}

export default register;