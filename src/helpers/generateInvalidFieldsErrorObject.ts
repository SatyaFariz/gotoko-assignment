import { ValidationError } from "class-validator"

export default function generateInvalidFieldsErrorObject(errors: ValidationError[]): { error: object[], message: string } {
  const error = errors.map(error => {
    const messages = []
    for(const key in error.constraints) {
      messages.push(error.constraints[key])
    }
    return {
      message: messages.join('. '),
      path: [
        error.property
      ],
      type: 'any.invalid',
      context: {
        label: error.property,
        key: error.property
      }
    }
  })

  const message = `body ValidationError: ${error.map(item => item.message).join('. ')}`

  return { error, message }
}