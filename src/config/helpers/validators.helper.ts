import { isValidObjectId } from 'mongoose';

export class Validator {
  static isMongoId(id: string): boolean {
    return isValidObjectId(id);
  }

  static isEmail(email: string): boolean {
    return /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }

  static isPhone(phone: string): boolean {
    return /^[\\+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/.test(phone);
  }

  static isPassword(password: string): boolean {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }
}
