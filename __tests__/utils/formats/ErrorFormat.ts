export const checkErrorFormat = (body): void => {
  expect(body).toEqual({
    message: expect.any(String),
    description: Array.isArray(body.description) ? expect.any(Array) : expect.any(String),
    http_response: {
      code: expect.any(Number),
      message: expect.any(String),
    },
  })
}