import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// define interface Request
interface ValidationRequest extends Request {
  payload: Payload;
}

interface Payload {
  username: string,
  email: string,
  role: string
}

// middleware buat validate JWT token
const accessValidation = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
        const payload = jwtDecode as Payload;
        if (allowedRoles.includes(payload.role)) {
          next();
        } else {
          // Role is not allowed
          return res.status(403).json({ message: "Forbidden role" });
        }
      }
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};

const usernameValidation = (username: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const valReq = req as ValidationRequest;
    const { authorization } = valReq.headers;

    const token = authorization.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    try {
      const jwtDecode = jwt.verify(token, secret);

      if (typeof jwtDecode !== 'string') {
        const payload = jwtDecode as Payload;
        if (username === payload.username) {
          // User is allowed, continue to the next middleware or route handler
          next();
        } else {
          // Not allowed
          return res.status(403).json({ message: "Forbidden user" });
        }
      }
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export {usernameValidation, accessValidation}