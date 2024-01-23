import { Validator } from '../../../src/config/helpers/index';

describe('Test validator.helper.ts', () => {
  it('should return true when a valid MongoDB ObjectId string is passed', () => {
    const id = '507f191e810c19729de860ea';
    const expected = Validator.isMongoId(id);

    expect(expected).toBe(true);
  });

  it('should return false when a invalid MongoDB ObjectId string is passed', () => {
    const id = '507f191e810c19729de860e';
    const expected = Validator.isMongoId(id);

    expect(expected).toBe(false);
  });

  it('should return true when a valid email address string is passed', () => {
    const correntEmail = 'test@example.com';
    const expected = Validator.isEmail(correntEmail);

    expect(expected).toBeTruthy;
  });

  it('should return false when a invalid email address string is passed', () => {
    const incorrectEmail = 'testexample.com';
    const expected = Validator.isEmail(incorrectEmail);

    expect(expected).toBeFalsy;
  });

  it('should return true when a valid phone number string is passed', () => {
    const phone = '+123456789';
    const expected = Validator.isPhone(phone);

    expect(expected).toBeTruthy;
  });

  it('should return true when a valid password string is passed', () => {
    const password = 'Password1';
    const result = Validator.isPassword(password);
    expect(result).toBe(true);
  });
});
