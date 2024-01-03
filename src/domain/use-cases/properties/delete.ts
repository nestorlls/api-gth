import { PropertyService } from '@domain/abstracts/services';
import { PropertyEntity } from '@domain/entities';

interface IDeleteProperty {
  execute(id: string): Promise<PropertyEntity>;
}
export class DeleteProperty implements IDeleteProperty {
  constructor(private readonly service: PropertyService) {}

  execute(id: string): Promise<PropertyEntity> {
    return this.service.deleteProperty(id);
  }
}
