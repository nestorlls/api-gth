import { UploadFileAbstract } from '@domain/abstracts/services';
import { DeleteFileDto, UploadFileDto } from '@domain/dtos';
import { useCases } from '@domain/use-cases/use-cases';
import { HandleError } from '@presentation/errors/handle.error';
import { Request, Response } from 'express';

export class UploadController {
  constructor(private readonly service: UploadFileAbstract) {}

  uploadFile = (req: Request, res: Response) => {
    const { type, files } = req.body;

    const [error, uploadFileDto] = UploadFileDto.create({ files, type });
    if (error) return HandleError.handle(error, res);

    new useCases.UploadFile.UploadFile(this.service)
      .execute(uploadFileDto!)
      .then((file) => res.status(200).json(file))
      .catch((error) => HandleError.handle(error, res));
  };

  deleteFile = (req: Request, res: Response) => {
    {
      const { type } = req.params;
      const { files } = req.body;

      const [error, deleteFileDto] = DeleteFileDto.create({ files, type });
      if (error) HandleError.handle(error, res);

      new useCases.UploadFile.DeleteFile(this.service)
        .execute(deleteFileDto!)
        .then((file) => res.status(200).json({ message: file }))
        .catch((error) => HandleError.handle(error, res));
    }
  };
}
