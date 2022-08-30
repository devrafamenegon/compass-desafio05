export interface ICustomError {
  message: string;
  description: string;
  http_response: {
    message: string;
    code: number;
  }
}