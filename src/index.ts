import express, { Application, Request, Response } from 'express';
import prisma from './src/prismaClient';
import router from './src/routers/router';

const app: Application = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS is a browser security feature that restricts cross-origin HTTP requests with other servers and specifies which domains access your resources.
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
const port: number = 3000;

// Route the request
app.use('/', router)

// launch the service on port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})