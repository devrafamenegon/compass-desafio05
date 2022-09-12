export interface IMapper {
  fields: IMapperField[]
}

export interface IMapperField {
  type: string
  fieldProduct: string
  fieldMarket: string
  optional?: string[]
}
