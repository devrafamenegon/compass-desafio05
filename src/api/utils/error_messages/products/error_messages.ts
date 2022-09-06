export abstract class ProductErrorMessages {
  static readonly BAD_REQUEST = 'Invalid request body'
  static readonly BARCODES_ALREADY_EXIST: string = 'Barcodes already exist'
  static readonly PRODUCT_NOT_FOUND: string = 'Product not found'
  static readonly PRODUCT_NOT_CREATED: string = 'Product not created'
  static readonly PRODUCT_NOT_UPDATED: string = 'Product not updated'
  static readonly PRODUCT_NOT_DELETED: string = 'Product not deleted'
  static readonly INVALID_PRODUCT_ID: string = 'Invalid product id'
  static readonly INVALID_QUERY_PARAMS: string = 'Invalid query parameters'
  static readonly CSV_FILE_TOO_BIGGER: string = 'Invalid csv file'
  static readonly NOT_CSV_FILE: string = 'File is not a csv'
  static readonly INTERNAL_SERVER_ERROR: string = 'Unexpected internal server error.'
}