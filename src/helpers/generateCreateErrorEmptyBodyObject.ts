
export default function generateCreateEmptyBodyErrorObject(requiredFields: string[]) {
  return requiredFields.map(field => ({
    message: `${field} is required`,
      path: [
        field
      ],
      type:' any.required',
      context: {
        label: field,
        key: field
      }
  }))
}