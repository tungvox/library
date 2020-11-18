import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { InternalServerError } from '../helpers/apiError';

import User from '../models/User'
import {JWT_SECRET} from '../util/secrets'
// const auth = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header("token");
//   if (!token) return res.status(401).json({ message: "Auth Error" });

//   try {
//     const decoded = jwt.verify(token, "randomString");
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     next(new InternalServerError('Error in Saving', error))
//   }
// };

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send('Access denied!');

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
};

export default auth
