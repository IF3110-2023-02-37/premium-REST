import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// define interface Request
interface ValidationRequest extends Request {
  userData: UserData;
}

interface UserData {
  username: string;
  password: string;
}

// middleware buat validate JWT token
const accessValidation = (req: Request, res: Response, next: NextFunction) => {
  const valReq = req as ValidationRequest;
  
  // check header from the request.
  const { authorization } = valReq.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Token needed" });
  }

  const token = authorization.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  try {
    // verify token
    const jwtDecode = jwt.verify(token, secret);

    if (typeof jwtDecode !== 'string') {
      valReq.userData = jwtDecode as UserData;
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // If the token is valid, proceed
  next();
};

export default accessValidation;