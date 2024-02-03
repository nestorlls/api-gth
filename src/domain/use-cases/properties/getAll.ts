import { PropertyService } from '@domain/abstracts/services';
import { PaginationDto, ReturnWithPaginateDto } from '@domain/dtos';
import { PropertyEntity } from '@domain/entities';

interface IGetAllProperties {
  execute(dto: PaginationDto): Promise<ReturnWithPaginateDto<PropertyEntity>>;
}
export class GetAllProperties implements IGetAllProperties {
  constructor(private readonly service: PropertyService) {}

  execute(dto: PaginationDto): Promise<ReturnWithPaginateDto<PropertyEntity>> {
    return this.service.getAllProperties(dto);
  }
}
