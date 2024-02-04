import { DeleteProperty } from '../../../../src/domain/use-cases/properties';
import { mockProperty, mockPropertyService } from './mock/property.service';

describe('Test Update Property Use Case', () => {
  test('should call delete property use case', () => {
    const propertyId = '507f191e810c19729de860ea';
    const deleteProperty = new DeleteProperty(mockPropertyService);

    const result = deleteProperty.execute(propertyId);

    expect(result).toEqual(mockProperty);
    expect(mockPropertyService.deleteProperty).toHaveBeenCalledWith(propertyId);
    expect(mockPropertyService.deleteProperty).toHaveBeenCalledTimes(1);
  });
});
