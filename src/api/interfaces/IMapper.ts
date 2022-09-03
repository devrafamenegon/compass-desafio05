export interface IMapper {
  fields: Array<IMapperField>
}

export interface IMapperField {
  type: string
  fieldProduct: string
  fieldMarket: string
  optional?: Array<string>
}