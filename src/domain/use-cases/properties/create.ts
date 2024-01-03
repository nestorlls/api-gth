import { PropertyService } from '@domain/abstracts/services';
import { CreatePropertyDto } from '@domain/dtos';
import { PropertyEntity } from '@domain/entities';

interface ICreateProperty {
  execute(dto: CreatePropertyDto): Promise<PropertyEntity>;
}

export class CreateProperty implements ICreateProperty {
  constructor(private readonly service: PropertyService) {}

  execute(dto: CreatePropertyDto): Promise<PropertyEntity> {
    return this.service.createProperty(dto);
  }
}
