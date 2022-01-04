export enum statusResponse {
  Success = "Success",
  BadRequest = "Bad Request",
  InternalServerError = "Internal Server Error",
}

export interface IHttpResponse {
  message: statusResponse;
  code: number;
  error: string;
  data: any;
}
