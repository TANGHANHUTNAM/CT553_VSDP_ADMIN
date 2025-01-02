export interface IResponse<T> {
  statusCode: number;
  message: string | Array<string>;
  data?: T;
  error?: string;
}
