import express, { Application, Request, Response } from 'express';
import register  from './src/handler/auth';
import prisma from './src/prismaClient'

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: number = 3000;

// Route the request
const route = require('./routers/router')
app.use('/', route)


// launch the service on port 3000
app.listen(port, () => {
  console.log(`Server is running! on port ${port}`);
})

// app.get("/", (_req, res: Response) => {
//   res.send(`Server is running on port: ${port}`);
// });

// app.post('/register', register);