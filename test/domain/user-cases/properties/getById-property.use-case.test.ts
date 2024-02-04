import { GetPropertyById } from '../../../../src/domain/use-cases/properties';
import { mockProperty, mockPropertyService } from './mock/property.service';

describe('Test Get Property by Id Use Case', () => {
  test('should return a property by id', () => {
    const propertyId = '507f191e810c19729de860ea';
    const property = new GetPropertyById(mockPropertyService);

    const result = property.execute(propertyId);

    expect(result).toEqual(mockProperty);
    expect(mockPropertyService.getPropertyById).toHaveBeenCalledWith(propertyId);
    expect(mockPropertyService.getPropertyById).toHaveBeenCalledTimes(1);
  });
});
