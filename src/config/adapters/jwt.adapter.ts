import { envs } from '@config/environments';
import jwt from 'jsonwebtoken';

export class JwtAdapter {
  static async generateToken(
    payload: string | object,
    jwt_secret: string,
    duration: string = '1h',
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, jwt_secret, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);
        resolve(token as string);
      });
    });
  }

  static async verifytoken<T>(token: string, jwt_secret: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, jwt_secret, (err, decored) => {
        if (err) return resolve(null);
        resolve(decored as T);
      });
    });
  }
}
