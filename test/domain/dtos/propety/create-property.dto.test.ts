import { CreatePropertyDto } from '../../../../src/domain/dtos';

describe('Test Create Property Dto', () => {
  test('should create a valid object propertyDto with valid properties', () => {
    const props = {
      type: 'sale',
      user: '507f191e810c19729de860ea',
      address: 'address',
      description: 'description',
      price: 100,
      rent: 100,
      maintance: 100,
      propertyType: 'flat',
      bedrooms: 1,
      bathrooms: 1,
      petAllowed: false,
      area: 100,
    };

    const [error, propertyDto] = CreatePropertyDto.create(props);

    expect(error).toBeUndefined();
    expect(propertyDto).toMatchObject(props);
    expect(propertyDto).toBeInstanceOf(CreatePropertyDto);
    expect(propertyDto).toHaveProperty('status');
    expect(propertyDto).toHaveProperty('user');
    expect(propertyDto).toHaveProperty('images');
  });

  test('should throw an error with invalid properties', () => {
    const props = {
      type: 'sale',
      user: '123',
      address: 'address',
      price: 100,
      rent: 100,
    };

    const [error, propertyDto] = CreatePropertyDto.create(props);

    expect(propertyDto).toBeUndefined();
    expect(error).toBeInstanceOf(Error);
    expect(error).toHaveProperty('message');
    expect(error!.message).toEqual(expect.any(String));
  });
});
