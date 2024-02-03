import { Property } from '@data/mongo/models';
import { CustomeError } from '@domain/errors';
import { PropertyEntity } from '@domain/entities';
import { CreatePropertyDto, PaginationDto, ReturnWithPaginateDto, UpdatePropertyDto } from '@domain/dtos';
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

  async getAllPropertiesByUser(id: string): Promise<PropertyEntity[]> {
    const properties = await this.model.find({ user: id });
    return properties.map((property) => PropertyEntity.fromObject(property.toJSON()));
  }

  async getPropertyById(id: string): Promise<PropertyEntity> {
    let property;
    try {
      property = await this.model.findById(id).populate('user', 'name email phone');
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    if (!property) throw CustomeError.notFound('Property not found');
    return PropertyEntity.fromObject(property.toJSON());
  }

  async createProperty(dto: CreatePropertyDto): Promise<PropertyEntity> {
    let property;
    try {
      property = await this.model.create(dto);
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }

    return PropertyEntity.fromObject(property.toJSON());
  }

  async updateProperty(dto: UpdatePropertyDto): Promise<PropertyEntity> {
    let property;
    try {
      property = await this.model.findByIdAndUpdate({ _id: dto.id }, dto, { new: true });
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }
    if (!property) throw CustomeError.notFound('Property not found');

    return PropertyEntity.fromObject(property.toJSON());
  }

  async deleteProperty(id: string): Promise<PropertyEntity> {
    let property;
    try {
      property = await this.model.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw CustomeError.internalServerError(`${error}`);
    }

    if (!property) throw CustomeError.notFound('Property not found');
    return PropertyEntity.fromObject(property);
  }
}
