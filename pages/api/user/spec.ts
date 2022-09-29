import { cloneDeep, isEqual, isArray, isObject } from "lodash";
import httpMocks from "node-mocks-http";
import { describe, expect, it } from "vitest";

import { prisma } from "../../../prisma/db";
import { generateFakeUser } from "../book/generator";
import handler from "./index.api";
import userIdHandler from "./[userID]/index.api";
import { createUser } from "./interactions";
const user = generateFakeUser();
const user1 = generateFakeUser();
const user2 = generateFakeUser();
//TODO: MAKE ONE USER BORROW BOOK FROM ANOTHER USER AND CREATE TEST TO REMOVE THE BOOKS AND TALK TO FRANZ IF YOU SPEND MORE THAN 30 MINS
let req = httpMocks.createRequest();
let res = httpMocks.createResponse();

const userId = async () => await (await createUser(user)).identifier;

describe("Test User DB Interactions", () => {
	// 1 Test
	it("test for successful user connection", async () => {
		try {
			await prisma.$queryRaw`SELECT 1`;
			return true;
		} catch (e) {
			throw new Error("Prisma connection check failed", e);
		}
	});
});

//test2
it("createUser returns userModel", async () => {
	await expect(
		Object.hasOwn(user, "identifier" && "username" && "telegramId")
	).toEqual(true);
});

describe("Test User Endpoints", () => {
	it("Post Handler", async () => {
		const request = httpMocks.createRequest({
			method: "POST",
			url: "/pages/api/user",
			body: user1,
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
	it("Get Handler should return array of User/Users", async () => {
		const request = httpMocks.createRequest({
			method: "GET",
			url: "/user/",
		});

		const response = httpMocks.createResponse();
		await handler(request, response);
		const data = JSON.parse(response._getData());
		expect(isArray(data)).toEqual(true);
	});
});

describe("Test User DB Interaction for Single User", () => {
	it("Returns Us the Single User Model", async () => {
		const userId = async () =>
			(await (
				await createUser(user)
			).identifier) as string;

		const request = httpMocks.createRequest({
			method: "GET",
			url: `/user/${userId}`,
		});
		const response = httpMocks.createResponse();
		await userIdHandler(request, response);
		const data = JSON.parse(response._getData());
		expect(data).toBeDefined();
	});
	it("Deletes a Single User Model with borrowed books", async () => {
		const newUser = await createUser(user);
		const userID = newUser.identifier;

		const request = httpMocks.createRequest({
			method: "DELETE",
			url: `/user/${userID}`,
		});
		const response = httpMocks.createResponse();
		await userIdHandler(request, response);
		const data = response._getData();
		console.log(userID);
		expect(response.statusCode).toBe(422);
	});

	it("Deletes the user if the user has no borrowed books", async () => {});
});
