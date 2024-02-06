import mongoose from 'mongoose';
import { envs } from '../../../src/config/environments';
import { MongoDB } from '../../../src/data/mongo/connection/mongo.connection';
import { PropertyDataSourceImpl } from '../../../src/infrastructure/datasource';
import { Property, User } from '../../../src/data/mongo/models';
import { CreatePropertyDto, UpdatePropertyDto } from '../../../src/domain/dtos';

describe('Test Property Datasource', () => {
  beforeAll(async () => {
    const mongo = new MongoDB();
    await mongo.connection({
      mongoUrl: envs.MONGO_DB_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  beforeEach(async () => {
    await Property.deleteMany({});
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // instance of PropertyDatasource
  const mockPropertyDatasourceImpl = new PropertyDataSourceImpl(Property);

  test('sould create a property', async () => {
    const [error, propertyDto] = CreatePropertyDto.create({
      type: 'rent',
      address: 'address test create property',
      rent: 100,
      maintance: 100,
      price: 0,
      propertyType: 'flat',
      bedRooms: 1,
      bathRooms: 1,
      description: 'test description crate property test',
      petAllowed: false,
      area: 100,
      images: [],
      status: 'active',
      user: '507f191e810c19729de860ea',
    });

    const spyCreateProperty = jest.spyOn(mockPropertyDatasourceImpl, 'createProperty');

    await mockPropertyDatasourceImpl.createProperty(propertyDto!);

    expect(spyCreateProperty).toHaveBeenCalled();
    expect(spyCreateProperty).toHaveBeenCalledWith(propertyDto);
    expect(spyCreateProperty).toHaveBeenCalledTimes(1);
    expect(mockPropertyDatasourceImpl.createProperty).toHaveBeenCalledWith(propertyDto);
    expect(error).toBeUndefined();
  });

  test('sould get all properties', async () => {
    const paginationDto = { page: 2, limit: 8 };
    const spyGetAllProperties = jest.spyOn(mockPropertyDatasourceImpl, 'getAllProperties');

    await mockPropertyDatasourceImpl.getAllProperties(paginationDto!);

    expect(spyGetAllProperties).toHaveBeenCalled();
    expect(spyGetAllProperties).toHaveBeenCalledWith(paginationDto);
    expect(spyGetAllProperties).toHaveBeenCalledTimes(1);
    expect(mockPropertyDatasourceImpl.getAllProperties).toHaveBeenCalledWith(paginationDto);
  });

  test('sould get a property by id', async () => {
    const user = await User.create({
      name: 'test name',
      email: 'test email',
      password: 'test password hashed',
      phone: '999999999',
      role: ['homeseeker'],
      avatar: 'url avatar',
    });

    const property = await Property.create({
      type: 'rent',
      address: 'address test create property',
      rent: 100,
      maintance: 100,
      price: 0,
      propertyType: 'flat',
      bedRooms: 1,
      bathRooms: 1,
      description: 'test description crate property test',
      petAllowed: false,
      area: 100,
      images: [],
      status: 'active',
      user: user.id,
    });

    const spyGetPropertyById = jest.spyOn(mockPropertyDatasourceImpl, 'getPropertyById');

    await mockPropertyDatasourceImpl.getPropertyById(property.id);

    expect(spyGetPropertyById).toHaveBeenCalled();
    expect(spyGetPropertyById).toHaveBeenCalledWith(property.id);
    expect(spyGetPropertyById).toHaveBeenCalledTimes(1);
    expect(mockPropertyDatasourceImpl.getPropertyById).toHaveBeenCalledWith(property.id);
  });

  test('sould update a property', async () => {
    const property = await Property.create({
      type: 'rent',
      address: 'address test create property',
      rent: 100,
      maintance: 100,
      price: 0,
      propertyType: 'flat',
      bedRooms: 1,
      bathRooms: 1,
      description: 'test description crate property test',
      petAllowed: false,
      area: 100,
      images: [],
      status: 'active',
      user: '507f191e810c19729de860ea',
    });

    const [error, updateDto] = UpdatePropertyDto.create({
      id: property.id,
      type: 'sale',
      status: 'inactive',
      user: '507f191e810c19729de860ea',
    });

    const spyUpdate = jest.spyOn(mockPropertyDatasourceImpl, 'updateProperty');

    await mockPropertyDatasourceImpl.updateProperty(updateDto!);

    expect(spyUpdate).toHaveBeenCalled();
    expect(spyUpdate).toHaveBeenCalledWith(updateDto);
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(mockPropertyDatasourceImpl.updateProperty).toHaveBeenCalledWith(updateDto);
    expect(error).toBeUndefined();
  });

  test('sould delete a property', async () => {
    const property = await Property.create({
      type: 'rent',
      address: 'address test create property',
      rent: 100,
      maintance: 100,
      price: 0,
      propertyType: 'flat',
      bedRooms: 1,
      bathRooms: 1,
      description: 'test description crate property test',
      petAllowed: false,
      area: 100,
      images: [],
      status: 'active',
      user: '507f191e810c19729de860ea',
    });

    const spyDelete = jest.spyOn(mockPropertyDatasourceImpl, 'deleteProperty');

    await mockPropertyDatasourceImpl.deleteProperty(property.id);

    expect(spyDelete).toHaveBeenCalled();
    expect(spyDelete).toHaveBeenCalledWith(property.id);
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(mockPropertyDatasourceImpl.deleteProperty).toHaveBeenCalledWith(property.id);
  });
});
