import { NextFunction, Request, Response } from 'express';

import { JwtAdapter } from '@config/adapters';
import { User } from '@data/mongo/models';
import { UserEntity } from '@domain/entities';
import { envs } from '@config/environments';

export class AuthMiddleware {
  static authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return this.unAuthorized('Token not found', res);
    }

    if (!authorization?.startsWith('Bearer ')) {
      return this.unAuthorized('Invalid Bearer token', res);
    }

    const [, token] = authorization!.split(' ');

    try {
      const payload = await JwtAdapter.verifytoken<{ id: string }>(token, envs.JWT_SECRET);
      if (!payload) {
        return this.unAuthorized('Invalid token', res);
      }

      const user = await User.findOne({ _id: payload!.id });
      if (!user) {
        return this.unAuthorized('User not found', res);
      }

      req.body.user = UserEntity.fromObject(user!.toJSON());

      next();
    } catch (error) {
      console.log(error);
    }
  };

  private static unAuthorized(message: string, res: Response) {
    return res.status(401).json({ name: 'Unauthorized', statusCode: 401, message });
  }
}
