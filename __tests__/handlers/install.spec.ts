import { handler } from '../../src/handlers/install';

describe('Main Handler', () => {
	test("Given all empty params should return success response", async () => {
		const response = await handler({}, {})
		expect(response).toEqual({
			body: "\"Hello from Lambda!\"",
			statusCode: 200
		});
	});
})
