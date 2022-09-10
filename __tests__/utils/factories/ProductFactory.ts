import { faker } from '@faker-js/faker'

export default function productFactory() {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    department: faker.commerce.department(),
    brand: faker.company.name(),
    qtd_stock: faker.datatype.number({ min: 1, max: 100000 }),
    price: faker.datatype.number({ min: 0.01, max: 1000, precision: 0.01 }),
    bar_codes: faker.random.numeric(13, { allowLeadingZeros: true })
  }
}