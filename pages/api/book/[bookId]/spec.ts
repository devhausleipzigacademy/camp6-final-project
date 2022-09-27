// package imports
import { describe, expect, it } from "vitest";
import httpMocks from "node-mocks-http";

// local imports
import { deleteBook, retrieveBook, updateBook } from "./interaction";
import { generateBook } from "../generator";
import handler from "./index.api";
import { createBook } from "../interaction";

// create a book to use for testing
const book = generateBook("b2791652-7a83-4a16-a18d-9943a3e16823");
var bookId = "";

describe("Test Book DB Interactions", () => {
	// 1st Test
	it("retrieveBook returns a single book model", async () => {
		// post book to compare
		const bookModel = await createBook(book);
		bookId = bookModel.identifier;

		// retrieve book
		const bookRetrieved = await retrieveBook(bookId);

		// compare both books and expect them to be equal
		expect(bookModel).toEqual(bookRetrieved);
	});
	// 2nd Test
	it("updateBook updates given value of book in database", async () => {
		const updatedBook = await updateBook(bookId, { author: "stephan" });

		// check that author of updated book is changed
		expect(updatedBook.author).toEqual("stephan");
	});
	// 3rd Test
	it("deleteBook returns bookModel and deletes it from db", async () => {
		const deletedBook = await deleteBook(bookId);

		// check that deletedBook has expected author
		expect(deletedBook.author).toEqual("stephan");
	});
});

// 	it("retrieveBooks returns array, if array not empty check for book key author", async () => {
// 		const booksdb = await retrieveBooks();

// 		if (booksdb.length > 1) expect(booksdb[0].author).toBeDefined();
// 	});
// });

describe("Test Book Endpoints", () => {
	// GET
	it("GET HANDLER should retrieve single book", async () => {
		// recreate book entry for get handler to retrieve
		const bookModel = await createBook(book);
		bookId = bookModel.identifier;

		const request = httpMocks.createRequest({
			method: "GET",
			url: `/book/${bookId}`,
			query: { bookId: bookId },
		});

		const response = httpMocks.createResponse();

		// call handler with GET request
		await handler(request, response);

		//parse response
		const data = JSON.parse(response._getData());

		//check response
		expect(data.identifier).toEqual(bookId);
	});
	// PUT
	it("PUT Handler updates given values of single book entry", async () => {
		const request = httpMocks.createRequest({
			method: "PUT",
			url: `/book/${bookId}`,
			body: { title: "This is a Test", genres: [], tags: [] },
			query: { bookId: bookId },
		});

		const response = httpMocks.createResponse();

		await handler(request, response);

		expect(response.statusCode).toEqual(204);
	});
	// DELETE
	it("DELETE handler erases single book entry", async () => {
		const request = httpMocks.createRequest({
			method: "DELETE",
			url: `/book/${bookId}`,
			query: { bookId: bookId },
		});
		const response = httpMocks.createResponse();

		await handler(request, response);

		const data = JSON.parse(response._getData());

		expect(data.identifier).toEqual(bookId);
	});
});

// Test lending

// 1st Test for borrowing

// 2nd Test for returning
