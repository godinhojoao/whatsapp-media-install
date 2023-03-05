export const handler = async (event: any, context: any): Promise<any> => {
  console.log('context', context)
  console.log('event2', event)
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!')
  }
  return response
}
