import { PropertyDatasource } from '@domain/abstracts/datasource';
import { PropertyRepository } from '@domain/abstracts/repository';
import { CreatePropertyDto, PaginationDto, ReturnWithPaginateDto, UpdatePropertyDto } from '@domain/dtos';
import { PropertyEntity } from '@domain/entities';

export class PropertyRepositoryImpl implements PropertyRepository {
  constructor(private readonly datasource: PropertyDatasource) {}

  async getAllProperties(dto: PaginationDto): Promise<ReturnWithPaginateDto<PropertyEntity>> {
    return await this.datasource.getAllProperties(dto);
  }

  async getPropertyById(id: string): Promise<PropertyEntity> {
    return await this.datasource.getPropertyById(id);
  }

  async getAllPropertiesByUser(userId: string): Promise<PropertyEntity[]> {
    return await this.datasource.getAllPropertiesByUser(userId);
  }

  async createProperty(dto: CreatePropertyDto): Promise<PropertyEntity> {
    return await this.datasource.createProperty(dto);
  }

  async updateProperty(dto: UpdatePropertyDto): Promise<PropertyEntity> {
    return await this.datasource.updateProperty(dto);
  }

  async deleteProperty(id: string): Promise<PropertyEntity> {
    return await this.datasource.deleteProperty(id);
  }
}
