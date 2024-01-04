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

  static fromObject(props: { [key: string]: any }): PropertyEntity {
    if (!props.id) throw CustomeError.badRequest('Missing property Id in Property Entity');
    if (!Validator.isMongoId(props.id)) throw CustomeError.badRequest('Invalid property id Property Entity');
    if (!props.type) throw CustomeError.badRequest('Missing type Property Entity');
    if (!props.address) throw CustomeError.badRequest('Missing property address Property Entity');
    if (props.rent === undefined) throw CustomeError.badRequest('Missing rent price Property Entity');
    if (props.maintance === undefined) throw CustomeError.badRequest('Missing maintance price Property Entity');
    if (props.price === undefined) throw CustomeError.badRequest('Missing price sale Property Entity');
    if (!props.propertyType) throw CustomeError.badRequest('Missing propertyType Property Entity');
    if (props.bedRooms === undefined) throw CustomeError.badRequest('Missing bedRooms Property Entity');
    if (props.bathRooms === undefined) throw CustomeError.badRequest('Missing bathRooms Property Entity');
    if (props.area === undefined) throw CustomeError.badRequest('Missing area Property Entity');
    if (props.petAllowed === undefined) throw CustomeError.badRequest('Missing petAllowed Property Entity');
    if (!props.description) throw CustomeError.badRequest('Missing description Property Entity');
    if (!props.images) throw CustomeError.badRequest('Missing images Property Entity');
    if (!props.status) throw CustomeError.badRequest('Missing status Property Entity');
    if (!props.user) throw CustomeError.badRequest('Missing user Id Property Entity');

    return new PropertyEntity(props as PropertyEntity);
  }
}
