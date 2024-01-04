import { Validator } from '@config/helpers';
import { CustomeError } from '@domain/errors';

export class UpdatePropertyDto {
  public id: string;
  public user: string;
  public type?: string;
  public address?: string;
  public rent?: number;
  public maintance?: number;
  public price?: number;
  public propertyType?: string;
  public bedRooms?: number;
  public bathRooms?: number;
  public area?: number;
  public petAllowed?: boolean;
  public description?: string;
  public images?: string[];
  public status?: string;

  private constructor(props: UpdatePropertyDto) {
    this.id = props.id;
    this.user = props.user;
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
  }

  get values() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentValues: { [key: string]: any } = {};

    if (this.type) currentValues.type = this.type;
    if (this.address) currentValues.address = this.address;
    if (this.rent) currentValues.rent = this.rent;
    if (this.maintance) currentValues.maintance = this.maintance;
    if (this.price) currentValues.price = this.price;
    if (this.propertyType) currentValues.propertyType = this.propertyType;
    if (this.bedRooms) currentValues.bedRooms = this.bedRooms;
    if (this.bathRooms) currentValues.bathRooms = this.bathRooms;
    if (this.area) currentValues.area = this.area;
    if (this.petAllowed) currentValues.petAllowed = this.petAllowed;
    if (this.description) currentValues.description = this.description;
    if (this.images) currentValues.images = this.images;
    if (this.status) currentValues.status = this.status;

    return currentValues;
  }

  static create(props: { [key: string]: any }): [CustomeError?, UpdatePropertyDto?] {
    const { id, user } = props;

    if (!id) return [CustomeError.badRequest('Missing property Id in updateDto')];
    if (!Validator.isMongoId(id)) return [CustomeError.badRequest('Invalid property Id in updateDto')];
    if (!user) return [CustomeError.badRequest('Missing user Id in updateDto')];
    if (!Validator.isMongoId(user)) return [CustomeError.badRequest('Invalid user Id in updateDto')];

    return [undefined, new UpdatePropertyDto(props as UpdatePropertyDto)];
  }
}
