import { UpdatePropertyDto } from '../../../../src/domain/dtos';
import { UpdateProperty } from '../../../../src/domain/use-cases/properties';
import { mockProperty, mockPropertyService } from './mock/property.service';

describe('Test Update Property Use Case', () => {
  test('should call update property use case', () => {
    const updateProperty = new UpdateProperty(mockPropertyService);
    const updatePropertyDto = UpdatePropertyDto.create({
      id: '507f191e810c19729de860ea',
      user: '507f191e810c19729de860ea',
      petAllowed: true,
    })[1];

    const result = updateProperty.execute(updatePropertyDto!);

    expect(result).toEqual(mockProperty);
    expect(mockPropertyService.updateProperty).toHaveBeenCalledWith(updatePropertyDto);
    expect(mockPropertyService.updateProperty).toHaveBeenCalledTimes(1);
  });
});
