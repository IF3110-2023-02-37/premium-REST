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

    // debug authorization
    console.log("Authorization");
    console.log(authorization);
    console.log("Token");
    console.log(token);
    
    const secret = process.env.JWT_SECRET;
    try {
      // verify token
      const jwtDecode = jwt.verify(token, secret);
      console.log("JWT Decode");
      console.log(jwtDecode);
      if (typeof jwtDecode !== 'string') {
        const payload = jwtDecode as Payload;
        if (allowedRoles.includes(payload.role)) {
          // Role is allowed, assign the payload to the request for future use
          console.log(payload.role)
          next();
        } else {
          // Role is not allowed
          return res.status(403).json({ message: "Forbidden" });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Unauthorized"});
    }
  }
};

export default accessValidation;