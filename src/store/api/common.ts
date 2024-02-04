export interface ErrorResponse {
  type: "error";
  code: number;
  message: string;
}

export const isErrorResponse = (data: any): data is ErrorResponse =>
  "type" in data && "code" in data && "message" in data
