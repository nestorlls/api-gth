import { PropertyService } from '@domain/abstracts/services';
import { UpdatePropertyDto } from '@domain/dtos';
import { PropertyEntity } from '@domain/entities';

interface IUpdateProperty {
  execute(dto: UpdatePropertyDto): Promise<PropertyEntity>;
}

export class UpdateProperty implements IUpdateProperty {
  constructor(private readonly service: PropertyService) {}

  execute(dto: UpdatePropertyDto): Promise<PropertyEntity> {
    return this.service.updateProperty(dto);
  }
}
