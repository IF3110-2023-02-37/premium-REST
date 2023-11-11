import express, { Application, Request, Response, NextFunction } from 'express';
import prisma from './prismaClient';
import router from './routers/router';

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err.stack);
}); 

// default route
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
}); 

// launch the service on port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})