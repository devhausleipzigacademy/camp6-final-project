// package imports
import { cloneDeep, isArray, isEqual } from "lodash";
import { describe, expect, it } from "vitest";
import httpMocks from "node-mocks-http";
import { prisma } from "../../../prisma/db";

// local imports
import { deleteBook, retrieveBook, updateBook } from "./interaction";
import { createBook, retrieveBooks } from "./interaction";
import { generateFakeBook, generateFakeUser } from "./generator";
import handlerBookId from "./[bookId]/index.api";
import handlerBooks from "./index.api";
import borrowHandler from "./[bookId]/lending.api";
import { createUser } from "../user/interactions";

// bindings to store Ids for different tests
var bookId = "";
var testUserId = "";

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
		// // // // // // // // // // //
		// // // // Preparation // // //
		// // // // // // // // // // //
		const testUser = generateFakeUser();
		const lenderModel = await createUser(testUser);
		testUserId = lenderModel.identifier;
		// // // // // // // // // // //

		const book = generateFakeBook(testUserId);
		const bookModel = await createBook(book);
		bookId = bookModel.identifier;

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
				ownerId: testUserId,
				genres: [],
				tags: [],
			},
		});

		const response = httpMocks.createResponse();

		// lodahs deep copy of response
		const responseCopy = cloneDeep(response);

		// call handler with Post request
		await handlerBooks(request, response);

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

		await handlerBooks(request, response);
		const data = JSON.parse(response._getData());

		// response should contain books array
		expect(isArray(data)).toEqual(true);
	});
});

//
//
//
// bindings to store Ids for different tests
//
//
//
var bookId = "";
var testUserId = "";

describe("Test Book DB Interactions", () => {
	// 1st Test
	it("retrieveBook returns a single book model", async () => {
		// // // // // // // // // // //
		// // // // Preparation // // //
		// // // // // // // // // // //
		const testUser = generateFakeUser();
		const lenderModel = await createUser(testUser);
		testUserId = lenderModel.identifier;
		const book = generateFakeBook(testUserId);
		// // // // // // // // // // //

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

describe("Test Book Endpoints", () => {
	// GET
	it("GET HANDLER should retrieve single book", async () => {
		const book = generateFakeBook(testUserId);
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
		await handlerBookId(request, response);

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

		await handlerBookId(request, response);

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

		await handlerBookId(request, response);

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
