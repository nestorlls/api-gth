export class ReturnWithPaginateDto<T> {
  public readonly page: number;
  public readonly limit: number;
  public readonly total: number;
  public readonly next: string | null;
  public readonly prev: string | null;
  public readonly data: T[];

  private constructor(props: ReturnWithPaginateDto<T>) {
    this.page = props.page;
    this.limit = props.limit;
    this.total = props.total;
    this.next = props.next;
    this.prev = props.prev;
    this.data = props.data;
  }

  static create<T>(props: ReturnWithPaginateDto<T>): ReturnWithPaginateDto<T> {
    return new ReturnWithPaginateDto<T>(props);
  }
}
