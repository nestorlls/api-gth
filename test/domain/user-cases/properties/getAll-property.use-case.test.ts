import { GetAllProperties } from '../../../../src/domain/use-cases/properties';
import { PaginationDto } from '../../../../src/domain/dtos';
import { mockProperty, mockPropertyService } from './mock/property.service';

describe('Test Get all Properties Use Case', () => {
  test('should get all properties use case', () => {
    const getAllProperties = new GetAllProperties(mockPropertyService);
    const paginationDto = PaginationDto.create({ page: 1, limit: 10 })[1];

    const result = getAllProperties.execute(paginationDto!);

    expect(result).toEqual([mockProperty]);
    expect(mockPropertyService.getAllProperties).toHaveBeenCalledWith(paginationDto);
    expect(mockPropertyService.getAllProperties).toHaveBeenCalledTimes(1);
  });
});
