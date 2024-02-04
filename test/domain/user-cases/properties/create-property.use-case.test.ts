import { CreateProperty } from '../../../../src/domain/use-cases/properties';
import { CreatePropertyDto } from '../../../../src/domain/dtos';
import { mockPropertyService, mockProperty } from './mock/property.service';

describe('Test Create Property Use Case', () => {
  test('should call create a new property use case', () => {
    const createProperty = new CreateProperty(mockPropertyService);
    const createPropertyDto = CreatePropertyDto.create({
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
    })[1];

    const result = createProperty.execute(createPropertyDto!);

    expect(result).toEqual(mockProperty);
    expect(mockPropertyService.createProperty).toHaveBeenCalledWith(createPropertyDto);
    expect(mockPropertyService.createProperty).toHaveBeenCalledTimes(1);
  });
});
