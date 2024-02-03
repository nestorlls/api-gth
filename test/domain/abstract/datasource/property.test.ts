import { PropertyDatasource } from '../../../../src/domain/abstracts/datasource/property';
import { PropertyEntity } from '../../../../src/domain/entities/property.entity';
import {
  CreatePropertyDto,
  PaginationDto,
  ReturnWithPaginateDto,
  UpdatePropertyDto,
} from '../../../../src/domain/dtos';

describe('Test Property datasource abstract class', () => {
  const paginationDto = {
    page: 1,
    limit: 10,
  };

  const property = new PropertyEntity({
    id: '123',
    type: 'rent',
    address: 'address test',
    rent: 100,
    maintance: 100,
    price: 0,
    propertyType: 'flat',
    bedRooms: 1,
    bathRooms: 1,
    petAllowed: false,
    area: 100,
    description: 'description test',
    images: [],
    status: 'active',
    user: '507f191e810c19729de860ea',
  });

  const data = {
    type: 'rent',
    address: 'address test',
    rent: 100,
    maintance: 100,
    price: 0,
    propertyType: 'flat',
    bedrooms: 1,
    bathrooms: 1,
    petAllowed: false,
    area: 100,
    description: 'description test',
    images: [],
    status: 'active',
    user: '507f191e810c19729de860ea',
  };

  const returnWithPaginateDto = {
    page: 1,
    limit: 10,
    total: 1,
    next: null,
    prev: null,
    data: [property],
  };

  class PropertyMock extends PropertyDatasource {
    async getAllProperties(dto: PaginationDto): Promise<ReturnWithPaginateDto<PropertyEntity>> {
      return returnWithPaginateDto;
    }

    async getPropertyById(id: string): Promise<PropertyEntity> {
      return property;
    }

    async getAllPropertiesByUser(userId: string): Promise<PropertyEntity[]> {
      return [property];
    }

    async createProperty(dto: CreatePropertyDto): Promise<PropertyEntity> {
      return property;
    }

    async updateProperty(dto: UpdatePropertyDto): Promise<PropertyEntity> {
      return property;
    }

    async deleteProperty(id: string): Promise<PropertyEntity> {
      return property;
    }
  }

  const propertyDatasource = new PropertyMock();

  test('should instance of PropertyDatasource', () => {
    expect(propertyDatasource).toBeInstanceOf(PropertyDatasource);
    expect(propertyDatasource).toHaveProperty('getAllProperties');
    expect(propertyDatasource).toHaveProperty('getPropertyById');
    expect(propertyDatasource).toHaveProperty('getAllPropertiesByUser');
    expect(propertyDatasource).toHaveProperty('createProperty');
    expect(propertyDatasource).toHaveProperty('updateProperty');
    expect(propertyDatasource).toHaveProperty('deleteProperty');
  });

  test('should create a new property', async () => {
    const spyCreateMock = jest.spyOn(propertyDatasource, 'createProperty');
    const newProperty = await propertyDatasource.createProperty(data);

    expect(newProperty).toEqual(property);
    expect(spyCreateMock).toHaveBeenCalledWith(data);
    expect(spyCreateMock).toHaveBeenCalledTimes(1);
  });

  test('should return all properties', async () => {
    const spyGetAll = jest.spyOn(propertyDatasource, 'getAllProperties');
    const response = await propertyDatasource.getAllProperties(paginationDto);

    expect(response).toEqual(returnWithPaginateDto);
    expect(response.data).toEqual([property]);
    expect(spyGetAll).toHaveBeenCalledWith(paginationDto);
    expect(spyGetAll).toHaveBeenCalledTimes(1);
  });

  test('should return a property by id', async () => {
    const spyGetById = jest.spyOn(propertyDatasource, 'getPropertyById');
    const response = await propertyDatasource.getPropertyById('123');

    expect(response).toEqual(property);
    expect(response).toHaveProperty('id', '123');
    expect(spyGetById).toHaveBeenCalledWith('123');
    expect(spyGetById).toHaveBeenCalledTimes(1);
  });

  test('should return all properties by user', async () => {
    const spyGetByUser = jest.spyOn(propertyDatasource, 'getAllPropertiesByUser');
    const response = await propertyDatasource.getAllPropertiesByUser('123');

    expect(response).toEqual([property]);
    expect(spyGetByUser).toHaveBeenCalledWith('123');
    expect(spyGetByUser).toHaveBeenCalledTimes(1);
  });

  test('should update a property', async () => {
    const [_, updateDto] = UpdatePropertyDto.create({ id: '00000020f51bb4362eee2a4d', type: 'sale' });
    const spyUpdate = jest.spyOn(propertyDatasource, 'updateProperty');

    const response = await propertyDatasource.updateProperty(updateDto!);

    expect({ ...response, type: 'sale' }).toEqual({ ...property, type: 'sale' });
    expect({ ...response, type: 'sale' }).toHaveProperty('type', 'sale');
    expect(spyUpdate).toHaveBeenCalledWith(updateDto);
    expect(spyUpdate).toHaveBeenCalledTimes(1);
  });

  test('should delete a property', async () => {
    const spyDelete = jest.spyOn(propertyDatasource, 'deleteProperty');
    const response = await propertyDatasource.deleteProperty('123');

    expect(response).toEqual(property);
    expect(response).toHaveProperty('id', '123');
    expect(spyDelete).toHaveBeenCalledWith('123');
    expect(spyDelete).toHaveBeenCalledTimes(1);
  });
});
