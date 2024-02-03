import { UpdatePropertyDto } from '../../../../src/domain/dtos';

describe('Test Update Property Dto', () => {
  const props = {
    id: '507f191e810c19729de860ea',
    user: '507f191e810c19729de860ea',
    type: 'sale',
    propertyType: 'apartment',
    bedRooms: 10,
    petAllowed: true,
  };

  test('should create a valid object updatePropertyDto with valid properties', () => {
    const [error, updatePropertyDto] = UpdatePropertyDto.create(props);

    expect(error).toBeUndefined();
    expect(updatePropertyDto).toMatchObject(props);
    expect(updatePropertyDto).toBeInstanceOf(UpdatePropertyDto);
    expect(updatePropertyDto).toHaveProperty('id');
    expect(updatePropertyDto).toHaveProperty('user');
  });

  test('shoulf throw an error if passing invalid properties', () => {
    const props = {
      id: '1234',
      user: '3234',
      type: undefined,
      propertyType: 'apartment',
    };

    const [error, updatePropertyDto] = UpdatePropertyDto.create(props);

    expect(error).toBeInstanceOf(Error);
    expect(updatePropertyDto).toBeUndefined();
    expect(error).toHaveProperty('message');
  });

  test('should get values from updatePropertyDto', () => {
    const [error, updatePropertyDto] = UpdatePropertyDto.create({ ...props, petAllowed: false });
    const expected = {
      type: 'sale',
      propertyType: 'apartment',
      bedRooms: 10,
      petAllowed: false,
    };

    expect(error).toBeUndefined();
    expect(updatePropertyDto?.values).toMatchObject(expected);
    expect(updatePropertyDto?.values).toBeInstanceOf(Object);
    expect(updatePropertyDto?.values).toHaveProperty('type');
  });
});
