
export default function generateCreateEmptyBodyErrorObject(fields: string[], message: string) {
  return [{
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
}