export class CustomError {
  message!: string;
  description!: string;
  http_message!: string;
  http_code!: number;

  constructor(
    message: string, 
    description: string,
    http_message: string,
    http_code: number,
  ) {
    this.message = message;
    this.description = description;
    this.http_message = http_message;
    this.http_code = http_code;
  }
}