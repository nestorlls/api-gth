import { Property } from '@data/mongo/models';
import { CustomeError } from '@domain/errors';
import { PropertyEntity } from '@domain/entities';
import { CreatePropertyDto, UpdatePropertyDto } from '@domain/dtos';
import { PaginationDto, ReturnWithPaginateDto } from '@domain/dtos/shared';
import { PropertyDatasource } from '@domain/abstracts/datasource';

export class PropertyDataSourceImpl implements PropertyDatasource {
  constructor(private readonly model: typeof Property) {}

  async getAllProperties(args: PaginationDto): Promise<ReturnWithPaginateDto<PropertyEntity>> {
    const { page, limit } = args;
    const [total, properties] = await Promise.all([
      this.model.countDocuments(),
      this.model
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('user', 'name email phone'),
    ]);

    return ReturnWithPaginateDto.create({
      page,
      limit,
      total,
      next: page * limit < total ? `${'hola'}/properties?page=${page + 1}&limit=${limit}` : null,
      prev: page - 1 > 0 && limit - 1 < total ? `${'hola'}/properties?page=${page - 1}&limit=${limit}` : null,
      data: properties.map((property) => PropertyEntity.fromObject(property.toJSON())),
    });
  }

  async getAllPropertiesByUser(args: string): Promise<PropertyEntity[]> {
    const id = args;
    const properties = await this.model.find({ user: id });
    return properties.map((property) => PropertyEntity.fromObject(property.toJSON()));
  }

  async getPropertyById(args: string): Promise<PropertyEntity> {
    const id = args;
    const propertyFound = await this.model.findById(id);
    if (!propertyFound) throw CustomeError.notFound('Property not found');
    return PropertyEntity.fromObject(propertyFound.toJSON());
  }

  async createProperty(args: CreatePropertyDto): Promise<PropertyEntity> {
    const newProperty = await this.model.create(args);
    return PropertyEntity.fromObject(newProperty.toJSON());
  }

  async updateProperty(args: UpdatePropertyDto): Promise<PropertyEntity> {
    const { id } = args;
    await this.getPropertyById(id);
    const propertyUpdated = await this.model.updateOne({ id }, args, { new: true });
    return PropertyEntity.fromObject(propertyUpdated);
  }

  async deleteProperty(args: string): Promise<PropertyEntity> {
    const id = args;
    await this.getPropertyById(id);
    const propertyDeleted = await this.model.deleteOne({ id });
    return PropertyEntity.fromObject(propertyDeleted);
  }
}
