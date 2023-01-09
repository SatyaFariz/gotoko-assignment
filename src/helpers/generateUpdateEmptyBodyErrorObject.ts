
export default function generateCreateEmptyBodyErrorObject(fields: string[]): { error: object[], message: string } {
  const message = `"value" must contain at least one of [${fields.join(', ')}]`
  const error = [{
    message,
    path: [],
    type: 'object.missing',
    context: {
      peers: fields,
      peersWithLabels: fields,
      label: 'value',
      value: {}
    }
  }]

  return { error, message: `body ValidationError: ${message}` }
}