import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send(`Server running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const prisma = new PrismaClient();


// Contoh
app.post("/users/create", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
  
});
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
