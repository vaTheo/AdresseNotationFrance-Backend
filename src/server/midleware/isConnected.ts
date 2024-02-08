import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class isConnected implements NestMiddleware {
  // To ensure that user can perform action before creating an account, create a token and create a new user
  async use(req: Request, res: Response, next: NextFunction) {
    // Extract the token from the request's cookies
    // Midlware to see if the user is connected or not, call this midlware only if you need an user to be connected
    let uuidToken = req.cookies['uuidtoken']; // Assuming the token is stored under the key 'token'

    // Proceed with the request
    next();
  }
}

