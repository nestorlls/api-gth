import { Validator } from '@config/helpers';
import { PropertyRepository } from '@domain/abstracts/repository';
import { PropertyService } from '@domain/abstracts/services';
import { CreatePropertyDto, PaginationDto, ReturnWithPaginateDto, UpdatePropertyDto } from '@domain/dtos';
import { PropertyEntity } from '@domain/entities';
import { CustomeError } from '@domain/errors';

export class PropertyServices implements PropertyService {
  constructor(private readonly repository: PropertyRepository) {}
  async getAllProperties(dto: PaginationDto): Promise<ReturnWithPaginateDto<PropertyEntity>> {
    return await this.repository.getAllProperties(dto);
  }

  async getPropertyById(id: string): Promise<PropertyEntity> {
    this.isValidaId(id);
    return await this.repository.getPropertyById(id);
  }

  async getAllPropertiesByUser(user: string): Promise<PropertyEntity[]> {
    this.isValidaId(user);
    return await this.repository.getAllPropertiesByUser(user);
  }

  async createProperty(dto: CreatePropertyDto): Promise<PropertyEntity> {
    return await this.repository.createProperty(dto);
  }

  async updateProperty(dto: UpdatePropertyDto): Promise<PropertyEntity> {
    return await this.repository.updateProperty(dto);
  }

  async deleteProperty(id: string): Promise<PropertyEntity> {
    this.isValidaId(id);
    return await this.repository.deleteProperty(id);
  }

  private isValidaId(id: string) {
    if (!Validator.isMongoId(id)) throw CustomeError.badRequest(`'${id}' is not a valid Mongo Id`);
  }
}
