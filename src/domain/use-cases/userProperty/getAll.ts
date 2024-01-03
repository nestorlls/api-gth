import { PropertyService } from '@domain/abstracts/services';
import { PropertyEntity } from '@domain/entities';

interface IGetUserProperties {
  execute(userId: string): Promise<PropertyEntity[]>;
}

export class GetUserProperties implements IGetUserProperties {
  constructor(private readonly service: PropertyService) {}

  execute(userId: string): Promise<PropertyEntity[]> {
    return this.service.getAllPropertiesByUser(userId);
  }
}
