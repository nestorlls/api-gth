import { GetUserProperties } from '../../../../src/domain/use-cases/userProperty/getAll';
import { mockPropertyService } from '../properties/mock/property.service';

describe('Test User Properties Use Case', () => {
  test('should get all user properties use case', () => {
    const userProperties = new GetUserProperties(mockPropertyService);
    const userID = '2';

    const result = userProperties.execute(userID);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          type: expect.any(String),
          user: expect.any(String),
          address: expect.any(String),
          description: expect.any(String),
          price: expect.any(Number),
          rent: expect.any(Number),
          maintance: expect.any(Number),
          propertyType: expect.any(String),
          bedrooms: expect.any(Number),
          bathrooms: expect.any(Number),
          petAllowed: expect.any(Boolean),
          area: expect.any(Number),
        }),
      ]),
    );
    expect(mockPropertyService.getAllPropertiesByUser).toHaveBeenCalledWith(userID);
    expect(mockPropertyService.getAllPropertiesByUser).toHaveBeenCalledTimes(1);
  });
});
