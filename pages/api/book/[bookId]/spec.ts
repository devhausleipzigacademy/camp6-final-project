// package imports
import { describe, expect, it } from "vitest";
import httpMocks from "node-mocks-http";

// local imports
import { deleteBook, retrieveBook, updateBook } from "./interaction";
import { generateFakeBook, generateFakeUser } from "../generator";
import handler from "./index.api";
import borrowHandler from "./lending.api";
import { createBook } from "../interaction";
import { createUser } from "../../user/interactions";

// create a book to use for testing
const book = generateFakeBook("b2791652-7a83-4a16-a18d-9943a3e16823");
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

// var for storing IDs of lender and borrower
var lenderId = "";
var borrowerId = "";
var bookToBorrowId = "";
var borrowedBookId = "";

// Test lending
describe("testing book lending handler", () => {
	// 1st Test for borrowing
	it("borrows a book by assigning userId to book key BorrowerId", async () => {
		// // // // // // // // // // //
		// // // // Preparation // // //
		// // // // // // // // // // //
		// TODO: update generateUser function once Furkan has created one himself
		const lender = generateFakeUser();
		const borrower = generateFakeUser();
		const lenderModel = await createUser(lender);
		const borrowerModel = await createUser(borrower);
		const fakeBook = generateFakeBook(lenderModel.identifier);
		const bookToBorrow = await createBook(fakeBook);
		lenderId = lenderModel.identifier;
		borrowerId = borrowerModel.identifier;
		bookToBorrowId = bookToBorrow.identifier;

		const request = httpMocks.createRequest({
			method: "PUT",
			url: `/book/${bookId}`,
			query: {
				// should the test work without providing a url? (it does)
				bookId: bookToBorrow.identifier,
				borrowerId: borrowerModel.identifier,
				action: "borrow",
			},
		});
		const response = httpMocks.createResponse();

		await borrowHandler(request, response);

		const data = JSON.parse(response._getData());

		// saving book ID for another test
		borrowedBookId = data.identifier;

		expect(data.identifier).toEqual(bookToBorrow.identifier);
	});

	// Error testing

	// 1. check for error message "Borrower not a valid user." by sending invalid borrowerId
	it("lending handler sends error when borrower is not a valid user", async () => {
		const request = httpMocks.createRequest({
			method: "PUT",
			url: `/book/${bookId}`,
			query: {
				bookId: bookToBorrowId,
				action: "borrow",
				borrowerId: "chewbaca",
			},
		});
		const response = httpMocks.createResponse();

		await borrowHandler(request, response);

		const data = response._getData();

		expect(data.message).toEqual("Borrower not a valid user.");
	});

	// 2. check for error message "Book already on loan." by using action borrow and sending defined borrowerId
	it("lending handler sends error when book is already on loan", async () => {
		const request = httpMocks.createRequest({
			method: "PUT",
			url: `/book/${bookId}`,
			query: {
				bookId: borrowedBookId,
				action: "borrow",
				borrowerId: borrowerId,
			},
		});
		const response = httpMocks.createResponse();

		await borrowHandler(request, response);

		const data = response._getData();

		expect(data.message).toEqual("Book already on loan.");
	});

	// 3. check for error message "Book is on loan by another user." by using return and sending wrong borrowerId
	it("lending handler sends error when book is on loan by a different user", async () => {
		const request = httpMocks.createRequest({
			method: "PUT",
			url: `/book/${bookId}`,
			query: {
				bookId: borrowedBookId,
				action: "return",
				borrowerId: lenderId,
			},
		});
		const response = httpMocks.createResponse();

		await borrowHandler(request, response);

		const data = response._getData();

		expect(data.message).toEqual("Book is on loan by another user.");
	});

	// 2nd Test for returning
	it("lending handler lets user return a book", async () => {
		const request = httpMocks.createRequest({
			method: "PUT",
			url: `/book/${bookId}`,
			query: {
				bookId: borrowedBookId,
				action: "return",
				borrowerId: borrowerId,
			},
		});
		const response = httpMocks.createResponse();

		await borrowHandler(request, response);

		const data = JSON.parse(response._getData());

		expect(data.identifier).toEqual(borrowedBookId);
	});
});
