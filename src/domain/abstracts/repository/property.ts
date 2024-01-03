import { CreatePropertyDto, UpdatePropertyDto } from '@domain/dtos';
import { PaginationDto, ReturnWithPaginateDto } from '@domain/dtos/shared';
import { PropertyEntity } from '@domain/entities';

export abstract class PropertyRepository {
  abstract getAllProperties(dto: PaginationDto): Promise<ReturnWithPaginateDto<PropertyEntity>>;
  abstract getPropertyById(id: string): Promise<PropertyEntity>;
  abstract getAllPropertiesByUser(userId: string): Promise<PropertyEntity[]>;
  abstract createProperty(dto: CreatePropertyDto): Promise<PropertyEntity>;
  abstract updateProperty(dto: UpdatePropertyDto): Promise<PropertyEntity>;
  abstract deleteProperty(id: string): Promise<PropertyEntity>;
}
