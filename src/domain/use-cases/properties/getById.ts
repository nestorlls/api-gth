import { PropertyService } from '@domain/abstracts/services';
import { PropertyEntity } from '@domain/entities';

interface IGetPropertyById {
  execute(id: string): Promise<PropertyEntity>;
}

export class GetPropertyById implements IGetPropertyById {
  constructor(private readonly service: PropertyService) {}

  execute(id: string): Promise<PropertyEntity> {
    return this.service.getPropertyById(id);
  }
}
