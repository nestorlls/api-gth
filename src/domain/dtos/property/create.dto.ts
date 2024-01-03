import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class CreatePropertyDto {
  public readonly type: string;
  public readonly address: string;
  public readonly maintance: number;
  public readonly price: number;
  public readonly propertyType: string;
  public readonly rooms: number;
  public readonly bathrooms: number;
  public readonly area: number;
  public readonly petAllowed: boolean;
  public readonly description: string;
  public readonly images: string[];
  public readonly status: string;
  public readonly user: string;

  private constructor(props: CreatePropertyDto) {
    this.type = props.type;
    this.address = props.address;
    this.maintance = props.maintance;
    this.price = props.price;
    this.propertyType = props.propertyType;
    this.rooms = props.rooms;
    this.bathrooms = props.bathrooms;
    this.area = props.area;
    this.petAllowed = props.petAllowed;
    this.description = props.description;
    this.images = props.images;
    this.status = props.status;
    this.user = props.user;
  }

  static create(props: CreatePropertyDto): [CustomeError?, CreatePropertyDto?] {
    const {
      type,
      address,
      maintance = 0,
      price = 0,
      propertyType,
      rooms = 0,
      bathrooms = 0,
      area = 0,
      petAllowed = false,
      description,
      images,
      status,
      user,
    } = props;

    let petAvailable = petAllowed;

    const validTypes = ['sale', 'rent'];
    const validPropertyTypes = ['House', 'Apartment'];
    const validStatus = ['active', 'inactive'];

    if (typeof petAllowed !== 'boolean') petAvailable = petAllowed === 'true';
    if (!type) return [CustomeError.badRequest('Type is required')];
    if (!validTypes.includes(type))
      return [CustomeError.badRequest(`${type} is not a valid type. Valid types: ${validTypes}`)];
    if (!address) return [CustomeError.badRequest('Address is required')];
    if (!maintance) return [CustomeError.badRequest('Maintance is required')];
    if (!price) return [CustomeError.badRequest('Price is required')];
    if (isNaN(price)) return [CustomeError.badRequest('Price must be a number')];
    if (!propertyType) return [CustomeError.badRequest('Property Type is required')];
    if (!validPropertyTypes.includes(propertyType))
      return [CustomeError.badRequest(`${propertyType} is not a valid type. Valid types: ${validPropertyTypes}`)];
    if (!rooms) return [CustomeError.badRequest('Rooms is required')];
    if (isNaN(rooms)) return [CustomeError.badRequest('Rooms must be a number')];
    if (!bathrooms) return [CustomeError.badRequest('Bathrooms is required')];
    if (isNaN(bathrooms)) return [CustomeError.badRequest('Bathrooms must be a number')];
    if (!area) return [CustomeError.badRequest('Area is required')];
    if (isNaN(area)) return [CustomeError.badRequest('Area must be a number')];
    if (!description) return [CustomeError.badRequest('Description is required')];
    if (!images) return [CustomeError.badRequest('Images is required')];
    if (!status) return [CustomeError.badRequest('Status is required')];
    if (!validStatus.includes(status))
      return [CustomeError.badRequest(`${status} is not a valid type. Valid types: ${validStatus}`)];
    if (!user) return [CustomeError.badRequest('User Id is required')];
    if (!Validator.isMongoId(user)) return [CustomeError.badRequest('Invalid user id')];

    return [
      undefined,
      new CreatePropertyDto({
        ...props,
        maintance: Number(maintance),
        price: Number(price),
        propertyType,
        rooms: Number(rooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        petAllowed: petAvailable,
      }),
    ];
  }
}
