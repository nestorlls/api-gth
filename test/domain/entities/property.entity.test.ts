import { PropertyEntity } from '../../../src/domain/entities';
import { CustomeError } from '../../../src/domain/errors';

describe('Test Property Entity', () => {
  const props = {
    id: '507f191e810c19729de860ea',
    type: 'house',
    address: '123 Main St',
    rent: 1000,
    maintance: 100,
    price: 0,
    propertyType: 'apartment',
    bedRooms: 2,
    bathRooms: 5,
    area: 98,
    petAllowed: true,
    description: 'description test',
    images: [],
    status: 'active',
    user: '507f191e810c19729de860ea',
  };

  test('should create a new PropertyEntity with all required properties', () => {
    const property = new PropertyEntity(props);

    expect(property).toBeInstanceOf(PropertyEntity);
    expect(property).toHaveProperty('id', props.id);
    expect(property).toHaveProperty('type', props.type);
    expect(property).toHaveProperty('address', props.address);
    expect(property).toHaveProperty('rent', props.rent);
    expect(property).toHaveProperty('maintance', props.maintance);
  });

  test('should map an object to a PropertyEntity', () => {
    const property = PropertyEntity.fromObject(props);

    expect(property).toBeInstanceOf(PropertyEntity);
    expect(property).toHaveProperty('id', props.id);
    expect(property).toHaveProperty('type', props.type);
  });

  test('should throw a bad request if passing an invalid id', () => {
    expect(() => PropertyEntity.fromObject({ ...props, id: '1234' })).toThrow(
      CustomeError.badRequest('Invalid property id Property Entity'),
    );
  });

  test('should throw a bad request if passing type as undefined', () => {
    expect(() => PropertyEntity.fromObject({ ...props, type: undefined })).toThrow(
      CustomeError.badRequest('Missing type Property Entity'),
    );
  });

  test('should throw a bad request if passing empty type', () => {
    expect(() => PropertyEntity.fromObject({ ...props, type: '' })).toThrow(
      CustomeError.badRequest('Missing type Property Entity'),
    );
  });

  test('should throw a bad request if passing address as undefined', () => {
    expect(() => PropertyEntity.fromObject({ ...props, address: undefined })).toThrow(
      CustomeError.badRequest('Missing property address Property Entity'),
    );
  });

  test('should throw a bad request if passing empty description', () => {
    expect(() => PropertyEntity.fromObject({ ...props, description: '' })).toThrow(
      CustomeError.badRequest('Missing description Property Entity'),
    );
  });
});
