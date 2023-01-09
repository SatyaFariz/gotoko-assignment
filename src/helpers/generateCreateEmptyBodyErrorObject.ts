
export default function generateCreateEmptyBodyErrorObject(requiredFields: string[]): { error: object[], message: string } {
  const error = requiredFields.map(field => ({
    message: `"${field}" is required`,
    path: [
      field
    ],
    type: 'any.required',
    context: {
      label: field,
      key: field
    }
  }))

  const message = `body ValidationError: ${error.map(item => item.message).join('. ')}`

  return { error, message }
}