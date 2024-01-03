import { CreatePropertyDto, UpdatePropertyDto } from '@domain/dtos';
import { PaginationDto, ReturnWithPaginateDto } from '@domain/dtos/shared';
import { PropertyEntity } from '@domain/entities';

export abstract class PropertyService {
  abstract getAllProperties(args: PaginationDto): Promise<ReturnWithPaginateDto<PropertyEntity>>;
  abstract getPropertyById(args: string): Promise<PropertyEntity>;
  abstract getAllPropertiesByUser(args: string): Promise<PropertyEntity[]>;
  abstract createProperty(args: CreatePropertyDto): Promise<PropertyEntity>;
  abstract updateProperty(args: UpdatePropertyDto): Promise<PropertyEntity>;
  abstract deleteProperty(args: string): Promise<PropertyEntity>;
}
