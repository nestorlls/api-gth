import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class BcryptAdapter {
  static hash(value: string) {
    const salt = genSaltSync(10);
    return hashSync(value, salt);
  }

  static compare(value: string, hash: string) {
    return compareSync(value, hash);
  }
}
