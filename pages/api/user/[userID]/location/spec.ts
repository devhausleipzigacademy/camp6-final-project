import { describe, expect, it } from "vitest";
import httpMocks from "node-mocks-http";
import { prisma } from "../../../../../prisma/db";
import pluralHandler from "./index.api";
import singleHandler from "./[locationId]/index.api";
import { isArray } from "lodash";
import { generateFakeUser } from "../../../book/generator";
import { createUser } from "../../interactions";

// // // // // // // // // // // //
// // Preparation // // // // // //
// // // // // // // // // // // //
const testUserData = generateFakeUser();
const testUser = await createUser(testUserData);

// This is where I will put all data and dummies I need to test locations

describe("Test Location DB handlers (including interactions)", () => {
	// 1st Test
	it("test for successful connection", async () => {
		try {
			await prisma.$queryRaw`SELECT 1`;
			return true;
		} catch (e) {
			throw new Error("Prisma connection check failed", e);
		}
	});
	// 2nd Test
	it("GET handler returns all location data in db", async () => {
		const request = httpMocks.createRequest({
			method: "GET",
			url: `user/${testUser.identifier}/location/`,
			query: { userId: testUser.identifier },
		});

		const response = httpMocks.createResponse();

		await pluralHandler(request, response);
		const data = JSON.parse(response._getData());

		expect(isArray(data)).toEqual(true);
	});
	// 3rd Test
	// it("POST handler creates location in db", async () => {
	// 	const request = httpMocks.createRequest({
	// 		method: "POST",
	// 		url: `/location`,
	// 		query: { userId: testUser.identifier },
	// 		body: {
	// 			latitude: 41.40338,
	// 			longitude: 2.17403,
	// 		},
	// 	});
	// 	console.log("testUser.identifier:", testUser.identifier);
	// 	const response = httpMocks.createResponse();

	// 	pluralHandler(request, response);
	// 	console.log("response", response._getData());
	// 	const data = JSON.parse(response._getData());

	// 	expect(data.identifier).toBeDefined();
	// });

	// 4th Test
	// it("GET Handler retrieves single specific location", async () => {
	// 	const locationId = "16bce44c-b6a4-4931-9c5b-05f37558c518";
	// 	const request = httpMocks.createRequest({
	// 		method: "GET",
	// 		url: `/location/${locationId}`,
	// 		query: { locationId: locationId },
	// 	});

	// 	const response = httpMocks.createResponse();

	// 	singleHandler(request, response);
	// 	console.log("response:", response._getData());

	// 	const data = JSON.parse(response._getData());

	// 	expect(data.identifier).toEqual(locationId);
	// });

	// 5th Test
	// it("DELETE handler removes location from db")

	// 6th Test
	// it("GET with querey hasBooks=true returns only locations associated with books")

	// 7th Test
	// it("GET with querey hasBooks=false returns only locations not associated with books")
});
