// package imports
import { cloneDeep, isArray, isEqual } from "lodash";
import { describe, expect, it } from "vitest";
import httpMocks from "node-mocks-http";

// local imports
import { createBook, retrieveBooks } from "./interaction";
import { generateBook } from "./generator";
import handler from "./index.api";
import { prisma } from "../../../prisma/db";

// create a book to use for testing
const book = generateBook("b2791652-7a83-4a16-a18d-9943a3e16823");
const books = [];
books.push(book);

describe("Test Book DB Interactions", () => {
	// 1 Test
	it("test for successful connection", async () => {
		try {
			await prisma.$queryRaw`SELECT 1`;
			return true;
		} catch (e) {
			throw new Error("Prisma connection check failed", e);
		}
	});
	// 2 Test
	it("createBook returns bookModel", async () => {
		const bookModel = await createBook(book);

		await expect(Object.hasOwn(bookModel, "identifier")).toEqual(true);
	});
	// 3 Test
	it("retrieveBooks returns array of books objects (or empty)", async () => {
		const booksdb = await retrieveBooks();

		expect(isArray(booksdb)).toEqual(true);
	});

	it("retrieveBooks returns array, if array not empty check for book key author", async () => {
		const booksdb = await retrieveBooks();

		if (booksdb.length > 1) expect(booksdb[0].author).toBeDefined();
	});
});

describe("Test Book Endpoints", () => {
	it("POST Handler", async () => {
		const request = httpMocks.createRequest({
			method: "POST",
			url: "/book/",
			body: {
				title: "doar",
				author: "tua",
				language: "en",
				ownerId: "b2791652-7a83-4a16-a18d-9943a3e16823",
				genres: [],
				tags: [],
			},
		});

		const response = httpMocks.createResponse();

		// lodahs deep copy of response
		const responseCopy = cloneDeep(response);

		// call handler with Post request
		await handler(request, response);

		const data = JSON.parse(response._getData());
		const dataCopy = JSON.parse(responseCopy._getData());

		expect(data.identifier).toBeDefined();

		//check if response has non-empty ID (if so, rip out ID and put it into manually created response)
		dataCopy.identifier = data.identifier;
		// use lodash is equal to compare and expect result to be true
		const doesIdMatch = isEqual(data, dataCopy);

		expect(doesIdMatch).toEqual(true);
	});
	it("GET Handler should return array of books object (or empty array if db empty)", async () => {
		const request = httpMocks.createRequest({
			method: "GET",
			url: "/book/",
		});

		const response = httpMocks.createResponse();

		await handler(request, response);
		const data = JSON.parse(response._getData());

		// response should contain books array
		expect(isArray(data)).toEqual(true);
	});
});
