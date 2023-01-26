export const handler = async(event: any) => {
    console.log('event', event)
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};