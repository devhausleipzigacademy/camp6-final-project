import { describe, expect, it } from "vitest";
import { createBook, retrieveBooks } from "./interaction";

import httpMocks from "node-mocks-http";
import handler from "./index.api";
import { generateBook } from "./generator";
import { cloneDeep, isArray, isEqual } from "lodash";

// create a book to use for testing
const book = generateBook("b2791652-7a83-4a16-a18d-9943a3e16823");
const books = [];
books.push(book);

describe("Test Book DB Interactions", () => {
	it("retrieveBooks returns array of books objects (or empty)", async () => {
		const booksdb = await retrieveBooks();

		expect(isArray(booksdb)).toEqual(true);
	});

	it("retrieveBooks returns array, if array not empty check for book key author", async () => {
		const booksdb = await retrieveBooks();

		if (booksdb.length > 1) expect(booksdb[0].author).toBeDefined();
	});

	it("createBook returns bookModel", async () => {
		const bookModel = await createBook(book);

		await expect(Object.hasOwn(bookModel, "identifier")).toEqual(true);
	});
});

describe("Test Book Endpoints", () => {
	it("POST Handler", async () => {
		const request = httpMocks.createRequest({
			method: "POST",
			url: "/book/",
		});

		const response = httpMocks.createResponse();

		// lodahs deep copy of response
		const responseCopy = cloneDeep(response);

		// call handler with Post request
		await handler(request, response);

		//check if response has non-empty ID (if so, rip out ID and put it into manually created response)
		if (Object.hasOwn(response, "id")) responseCopy.id = response.id;
		// use lodash is equal to compare and expect result to be true
		const doesIdMatch = isEqual(response, responseCopy);

		expect(doesIdMatch).toEqual(true);
	});
	it("GET Handler should return array of books object (or empty array if db empty)", async () => {
		const request = httpMocks.createRequest({
			method: "GET",
			url: "/book/",
		});

		const response = httpMocks.createResponse();

		await handler(request, response);

		// response should contain books array
		const booksArray = response.parsedBooks;

		expect(isArray(booksArray)).toEqual(true);
	});
});

// Test lending
