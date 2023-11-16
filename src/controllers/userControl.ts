import { Request, Response } from "express";
import { usernameValidation } from "../accessValidation/accessValidation";
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

  const checkUser = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  if (!checkUser) {
    return res.status(404).json({ message: "User not found" })
  }

  const isPasswordValid = await bcrypt.compare(password, checkUser.password);

  if (isPasswordValid) {
    // payload -> data yang akan diberikan kepada checkUser
    const payload = {
      username: checkUser.username,
      email: checkUser.email,
      role: checkUser.role
    }

    const secret = process.env.JWT_SECRET;
    const hour = 24;
    const expiresIn = 60 * 60 * hour;

    const user = await prisma.user.findUnique({
      where: {
        username: username
      }, 
      select: {
        username: true,
        email: true,
        displayName: true,
        picture: true,
        description: true,
        role: true
      }
    })
    const token = jwt.sign(payload, secret, {expiresIn: expiresIn})
    return res.json({
      user,
      token: token
    })
  } else {
    return res.status(403).json({ message: "Wrong password, try again" })
  }
}

const updateProfile = async (req: Request, res: Response) => {
  const { displayName, description, picture } = req.body;
  if (!displayName && !description && !picture) {
    return res.status(400).json({ message: 'No fields provided for update' });
  }

  const username = req.params.username;

  try {
    // Use usernameValidation as middleware
    usernameValidation(username)(req, res, async () => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });
    
        if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const dataToUpdate: Record<string, any> = {};
    
        if (displayName !== undefined) {
          dataToUpdate.displayName = displayName;
        }
    
        if (description !== undefined) {
          dataToUpdate.description = description;
        }
    
        if (picture !== undefined) {
          dataToUpdate.picture = picture;
        }
    
        const updatedUser = await prisma.user.update({
          where: {
            username: username
          },
          data: dataToUpdate,
        });
    
        res.status(200).json({ message: 'Success', data: updatedUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating profile' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "failed to fetch data" });
  }
  
};

const deleteAccount =async (req:Request, res:Response) => {
  const username = req.params.username;
  if (!username) {
    return res.status(400).json({ message: "missing value" })
  }
  try {
    const user = await prisma.user.delete({
      where: {
        username: username
      }
    })
    res.status(200).json({ data:user, message: "success" })
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error"});
  }
}

const getPodcaster =async (req:Request, res: Response) => {
  const podcaster = await prisma.user.findMany({
    where: {
      role: "user"
    }, 
    select: {
      username: true,
      displayName: true,
      picture: true,
    }
  })
  return res.json(podcaster);
}

const getAll = async(req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
}

const getDataPodcaster = async (req:Request, res: Response) => {
  const username = req.params.username;
  try {
    const podcaster = await prisma.user.findFirst({
      where: {
        username: username
      },
      select: {
        username: true,
        displayName: true,
        picture: true,
        description: true,
      }
    })

    const podcasts = await prisma.podcast.findMany({
      where: {
        podcaster: username
      },
      orderBy: {
        date: 'desc',
      },
    });

    return res.status(200).json({
      podcaster: podcaster,
      podcasts: podcasts
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "error fetching getDataPodcaster"})
  }
}

export {register, login, updateProfile, deleteAccount, getAll, getPodcaster, getDataPodcaster};