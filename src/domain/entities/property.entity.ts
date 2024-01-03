import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class PropertyEntity {
  public readonly id: string;
  public readonly type: string;
  public readonly address: string;
  public readonly rent: number;
  public readonly maintance: number;
  public readonly price: number;
  public readonly propertyType: string;
  public readonly bedRooms: number;
  public readonly bathRooms: number;
  public readonly area: number;
  public readonly petAllowed: boolean;
  public readonly description: string;
  public readonly images: string[];
  public readonly status: string;
  public readonly user: string;

  private constructor(props: PropertyEntity) {
    this.id = props.id;
    this.type = props.type;
    this.address = props.address;
    this.rent = props.rent;
    this.maintance = props.maintance;
    this.price = props.price;
    this.propertyType = props.propertyType;
    this.bedRooms = props.bedRooms;
    this.bathRooms = props.bathRooms;
    this.area = props.area;
    this.petAllowed = props.petAllowed;
    this.description = props.description;
    this.images = props.images;
    this.status = props.status;
    this.user = props.user;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromObject(props: { [key: string]: any }): PropertyEntity {
    if (!props.id) throw CustomeError.badRequest('Missing property id');
    if (!Validator.isMongoId(props.id)) throw CustomeError.badRequest('Invalid property id');
    if (!props.type) throw CustomeError.badRequest('Missing type');
    if (!props.address) throw CustomeError.badRequest('Missing property address');
    if (props.rent === undefined) throw CustomeError.badRequest('Missing rent price');
    if (props.maintance === undefined) throw CustomeError.badRequest('Missing maintance price');
    if (props.price === undefined) throw CustomeError.badRequest('Missing price sale');
    if (!props.propertyType) throw CustomeError.badRequest('Missing propertyType');
    if (props.bedRooms === undefined) throw CustomeError.badRequest('Missing bedRooms');
    if (props.bathRooms === undefined) throw CustomeError.badRequest('Missing bathRooms');
    if (props.area === undefined) throw CustomeError.badRequest('Missing area');
    if (props.petAllowed === undefined) throw CustomeError.badRequest('Missing petAllowed');
    if (!props.description) throw CustomeError.badRequest('Missing description');
    if (!props.images) throw CustomeError.badRequest('Missing images');
    if (!props.status) throw CustomeError.badRequest('Missing status');
    if (!props.user) throw CustomeError.badRequest('Missing userId');
    if (!Validator.isMongoId(props.user)) throw CustomeError.badRequest('Invalid user id');

    return new PropertyEntity(props as PropertyEntity);
  }
}
