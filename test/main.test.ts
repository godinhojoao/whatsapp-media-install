import { handler } from "../src/main";

describe('Main Handler', () => {
	test("Given an empty event should return success response", async () => {
		const response = await handler({})
		expect(response).toEqual({
			body: "\"Hello from Lambda!\"",
			statusCode: 200
		});
	});
})
