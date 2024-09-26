import { NextFunction } from 'express';
import {auth} from 'express-oauth2-jwt-bearer'
import { Request ,Response } from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/user';

declare global {
  namespace Express {
    interface Request {
      userId : string;
      auth0Id : string;
    }
  }
}

export const jwtCheck = auth({
    audience:'mern-food-ordering-app-api',
    issuerBaseURL:'https://dev-f3yhe4wrb52d8q5s.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

  export const jwtParse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;
  
    // Check if authorization is missing or if it doesn't start with "Bearer "
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.sendStatus(401); // Sending a 401 Unauthorized status code
    }
  
    const token = authorization.split(" ")[1];
    // Proceed with token validation (not shown here)
    try{ 
      let decoded = jwt.decode(token) as jwt.JwtPayload;
      const auth0Id = decoded.sub;

      const user =  await User.findOne({auth0Id});
      

      if(!user){
        return  res.sendStatus(401);
      }
      req.auth0Id = auth0Id as string;
      req.userId = user._id.toString();
      next();
    }catch(error){
      res.sendStatus(401)
      }

  };
  