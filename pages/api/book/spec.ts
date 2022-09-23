import { describe, expect, it } from "vitest";
import { createBook, retrieveBooks } from "./interaction";

import httpMocks from "node-mocks-http";
import handler from "./index.api";
import { generateBook } from "./generator";
import { Book } from "@prisma/client";

// the test are failing because I cannot figure out what it should resolve to

describe("Test Book DB Interactions", () => {
	it("retrieveBooks", async () => {
		await expect(retrieveBooks()).resolves.toEqual([]);
	});

	it("createBook returns bookModel", async () => {
		const book = generateBook("b2791652-7a83-4a16-a18d-9943a3e16823");
		await expect(createBook(book)).resolves.toEqual(Promise<Book>);
	});
});

describe("Test Book Endpoints", () => {
	it("POST Handler", () => {
		var request = httpMocks.createRequest({
			method: "POST",
			url: "/book/",
		});

		var response = httpMocks.createResponse();
		// lodahs deep copy of response

		handler(request, response);

		//check if response has non-empty id (if so, rip out id and put it into manually created response)
		// use lodash is equal to compace and expect result to be true

		expect(response).toEqual({
			status: "201",
		});
	});
	it("GET Handler", () => {
		var request = httpMocks.createRequest({
			method: "GET",
			url: "/book/",
		});

		var response = httpMocks.createResponse();

		handler(request, response);

		expect(response).toEqual({
			status: "200",
			json: {},
		});
	});
});
