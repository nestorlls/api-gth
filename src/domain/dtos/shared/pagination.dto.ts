import { CustomeError } from '@domain/errors';

export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}

  static create(props: PaginationDto): [CustomeError?, PaginationDto?] {
    const { page, limit } = props;

    if (isNaN(page) || isNaN(limit)) return [CustomeError.badRequest('Page and limit must be numbers')];
    if (page < 1 || limit < 1) return [CustomeError.badRequest('Page and limit must be greater than 0')];

    return [undefined, new PaginationDto(page, limit)];
  }
}
