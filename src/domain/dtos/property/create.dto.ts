import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class CreatePropertyDto {
  public readonly type: string;
  public readonly address: string;
  public readonly rent: number;
  public readonly maintance: number;
  public readonly price: number;
  public readonly propertyType: string;
  public readonly bedrooms: number;
  public readonly bathrooms: number;
  public readonly area: number;
  public readonly petAllowed: boolean;
  public readonly description: string;
  public readonly images?: string[];
  public readonly status: string;
  public readonly user: string;

  private constructor(props: CreatePropertyDto) {
    this.type = props.type;
    this.address = props.address;
    this.rent = props.rent;
    this.maintance = props.maintance;
    this.price = props.price;
    this.propertyType = props.propertyType;
    this.bedrooms = props.bedrooms;
    this.bathrooms = props.bathrooms;
    this.area = props.area;
    this.petAllowed = props.petAllowed;
    this.description = props.description;
    this.images = props.images;
    this.status = props.status;
    this.user = props.user;
  }

  static create(props: { [key: string]: any }): [CustomeError?, CreatePropertyDto?] {
    const {
      type,
      address,
      rent = 0,
      maintance = 0,
      price = 0,
      propertyType,
      bedrooms = 0,
      bathrooms = 0,
      area = 0,
      petAllowed = false,
      description,
      status,
      user,
      images = [],
    } = props;

    let petAvailable = petAllowed;
    let hasStatus = status;

    const validTypes = ['sale', 'rent'];
    const validPropertyTypes = ['flat', 'house', 'apartment'];

    if (typeof petAllowed !== 'boolean') petAvailable = petAllowed === 'true';
    if (!type) return [CustomeError.badRequest('Type is required in create property dto')];
    if (!validTypes.includes(type))
      return [
        CustomeError.badRequest(
          `${type} is not a valid type in create property dto. Valid types: ${validTypes.join(', ')}`,
        ),
      ];
    if (!address) return [CustomeError.badRequest('Address is required in create property dto')];
    if (!rent) return [CustomeError.badRequest('Rent is required in create property dto')];
    if (isNaN(rent)) return [CustomeError.badRequest('Rent must be a number in create property dto')];
    if (!maintance) return [CustomeError.badRequest('Maintance is required in create property dto')];
    if (isNaN(maintance)) return [CustomeError.badRequest('Maintance must be a number in create property dto')];
    if (!price) return [CustomeError.badRequest('Price is required in create property dto')];
    if (isNaN(price)) return [CustomeError.badRequest('Price must be a number in create property dto')];
    if (!propertyType) return [CustomeError.badRequest('Property Type is required in create property dto')];
    if (!validPropertyTypes.includes(propertyType))
      return [
        CustomeError.badRequest(
          `${propertyType} is not a valid type in create property dto. Valid types: ${validPropertyTypes.join(', ')}`,
        ),
      ];
    if (!bedrooms) return [CustomeError.badRequest('Rooms is required in create property dto')];
    if (isNaN(bedrooms)) return [CustomeError.badRequest('Rooms must be a number in create property dto')];
    if (!bathrooms) return [CustomeError.badRequest('Bathrooms is required in create property dto')];
    if (isNaN(bathrooms)) return [CustomeError.badRequest('Bathrooms must be a number in create property dto')];
    if (!area) return [CustomeError.badRequest('Area is required in create property dto')];
    if (isNaN(area)) return [CustomeError.badRequest('Area must be a number in create property dto')];
    if (!description) return [CustomeError.badRequest('Description is required in create property dto')];
    // if (!images) return [CustomeError.badRequest('Images is required')];
    if (!user) return [CustomeError.badRequest('User Id is required in create property dto')];
    if (!Validator.isMongoId(user)) return [CustomeError.badRequest('Invalid user Id in create property dto')];
    if (typeof status !== 'boolean') hasStatus = status === 'true' ? 'active' : 'inactive';

    return [
      undefined,
      new CreatePropertyDto({
        ...props,
        maintance: Number(maintance),
        price: Number(price),
        propertyType,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        petAllowed: petAvailable,
        status: hasStatus,
        images,
      } as CreatePropertyDto),
    ];
  }
}
