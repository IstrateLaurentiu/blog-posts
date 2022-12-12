import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class VerifyUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'No token; authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
      req['user'] = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  }
}
