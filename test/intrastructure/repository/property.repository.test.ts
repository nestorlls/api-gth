import { PropertyDatasource } from '../../../src/domain/abstracts/datasource';
import { CreatePropertyDto, UpdatePropertyDto } from '../../../src/domain/dtos';
import { PropertyRepositoryImpl } from '../../../src/infrastructure/repository';

describe('Test Property Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPropertyDatasource: PropertyDatasource = {
    getAllProperties: jest.fn(),
    getPropertyById: jest.fn(),
    getAllPropertiesByUser: jest.fn(),
    createProperty: jest.fn(),
    updateProperty: jest.fn(),
    deleteProperty: jest.fn(),
  };

  const propertyRepositoryImpl = new PropertyRepositoryImpl(mockPropertyDatasource);
  const paginationDto = { page: 1, limit: 8 };
  const propertyId = '123';
  const userId = '123456';

  test('should get all properties', async () => {
    const spyGetAllProperties = jest.spyOn(mockPropertyDatasource, 'getAllProperties');

    await propertyRepositoryImpl.getAllProperties(paginationDto!);

    expect(spyGetAllProperties).toHaveBeenCalled();
    expect(spyGetAllProperties).toHaveBeenCalledWith(paginationDto);
    expect(spyGetAllProperties).toHaveBeenCalledTimes(1);
    expect(mockPropertyDatasource.getAllProperties).toHaveBeenCalledWith(paginationDto);
  });

  test('should get a property by id', async () => {
    const spyGetPropertyById = jest.spyOn(mockPropertyDatasource, 'getPropertyById');

    await propertyRepositoryImpl.getPropertyById(propertyId);

    expect(spyGetPropertyById).toHaveBeenCalled();
    expect(spyGetPropertyById).toHaveBeenCalledWith(propertyId);
    expect(spyGetPropertyById).toHaveBeenCalledTimes(1);
    expect(mockPropertyDatasource.getPropertyById).toHaveBeenCalledWith(propertyId);
  });

  test('should get all properties by user', async () => {
    const spyGetAllPropertiesByUser = jest.spyOn(mockPropertyDatasource, 'getAllPropertiesByUser');

    await propertyRepositoryImpl.getAllPropertiesByUser(userId);

    expect(spyGetAllPropertiesByUser).toHaveBeenCalled();
    expect(spyGetAllPropertiesByUser).toHaveBeenCalledWith(userId);
    expect(spyGetAllPropertiesByUser).toHaveBeenCalledTimes(1);
    expect(mockPropertyDatasource.getAllPropertiesByUser).toHaveBeenCalledWith(userId);
  });

  test('should create a property', async () => {
    const spyCreateProperty = jest.spyOn(mockPropertyDatasource, 'createProperty');
    const createPropertyDto = CreatePropertyDto.create({
      type: 'rent',
      address: 'address test repository',
      rent: 500,
      maintance: 20,
      price: 0,
      propertyType: 'apartment',
      bedrooms: 4,
      bathrooms: 3,
      area: 100,
      petAllowed: true,
      description: 'description test repository',
      images: [],
      status: true,
      user: userId,
    })[1];

    await propertyRepositoryImpl.createProperty(createPropertyDto!);

    expect(spyCreateProperty).toHaveBeenCalled();
    expect(spyCreateProperty).toHaveBeenCalledWith(createPropertyDto);
    expect(spyCreateProperty).toHaveBeenCalledTimes(1);
    expect(mockPropertyDatasource.createProperty).toHaveBeenCalledWith(createPropertyDto);
  });

  test('should update a property', async () => {
    const spyUpdateProperty = jest.spyOn(mockPropertyDatasource, 'updateProperty');
    const updatePropertyDto = UpdatePropertyDto.create({
      id: '00000020f51bb4362eee2a4d',
      type: 'sale',
      rent: 0,
      maintance: 0,
      price: 10000,
    })[1];

    await propertyRepositoryImpl.updateProperty(updatePropertyDto!);

    expect(spyUpdateProperty).toHaveBeenCalled();
    expect(spyUpdateProperty).toHaveBeenCalledWith(updatePropertyDto);
    expect(spyUpdateProperty).toHaveBeenCalledTimes(1);
    expect(mockPropertyDatasource.updateProperty).toHaveBeenCalledWith(updatePropertyDto);
  });

  test('should delete a property by id', async () => {
    const spyDeleteProperty = jest.spyOn(mockPropertyDatasource, 'deleteProperty');

    await propertyRepositoryImpl.deleteProperty(propertyId);

    expect(spyDeleteProperty).toHaveBeenCalled();
    expect(spyDeleteProperty).toHaveBeenCalledWith(propertyId);
    expect(spyDeleteProperty).toHaveBeenCalledTimes(1);
    expect(mockPropertyDatasource.deleteProperty).toHaveBeenCalledWith(propertyId);
  });
});
