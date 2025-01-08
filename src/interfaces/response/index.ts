export interface IResponse<T> {
  statusCode: number;
  message: string | Array<string>;
  data?: T;
  error?: string;
}

export interface IPaginationResponse {
  current: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}
