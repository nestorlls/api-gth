import { Request, Response } from 'express';

import { useCases } from '@domain/use-cases/use-cases';
import { CreatePropertyDto, PaginationDto, UpdatePropertyDto } from '@domain/dtos';
import { PropertyServices } from '@presentation/service';
import { HandleError } from '@presentation/errors/handle.error';

export class PropertyController {
  constructor(private readonly service: PropertyServices) {}

  getAllProperties = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.params;
    const [error, paginationDto] = PaginationDto.create({ page: +page, limit: +limit });
    if (error) return HandleError.handle(error, res);

    new useCases.properties.GetAllProperties(this.service)
      .execute(paginationDto!)
      .then((properties) => res.status(200).json(properties))
      .catch((error) => HandleError.handle(error, res));
  };

  getPropertyById = (req: Request, res: Response) => {
    const { id } = req.params;
    new useCases.properties.GetPropertyById(this.service)
      .execute(id)
      .then((property) => res.status(200).json(property))
      .catch((error) => HandleError.handle(error, res));
  };

  createProperty = (req: Request, res: Response) => {
    const { id: user } = req.body.user;
    const [error, createDto] = CreatePropertyDto.create({ ...req.body, user });
    if (error) return HandleError.handle(error, res);

    new useCases.properties.CreateProperty(this.service)
      .execute(createDto!)
      .then((property) => res.status(200).json(property))
      .catch((error) => HandleError.handle(error, res));
  };

  updateProperty = (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: user } = req.body.user;
    const [error, updateDto] = UpdatePropertyDto.create({ id, ...req.body, user });
    if (error) return HandleError.handle(error, res);

    new useCases.properties.UpdateProperty(this.service)
      .execute(updateDto!)
      .then((property) => res.status(200).json(property))
      .catch((error) => HandleError.handle(error, res));
  };

  deleteProperty = (req: Request, res: Response) => {
    const { id } = req.params;
    new useCases.properties.DeleteProperty(this.service)
      .execute(id)
      .then((property) => res.status(204).json(property))
      .catch((error) => HandleError.handle(error, res));
  };
}
