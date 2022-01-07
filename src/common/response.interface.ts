export enum statusResponse {
  Success = "Success",
  BadRequest = "Bad Request",
  Unauthorized = "Unauthorized",
  InternalServerError = "Internal Server Error",
}

export interface IHttpResponse<Type> {
  message: statusResponse;
  code: number;
  error: string;
  data: Type | null;
}
