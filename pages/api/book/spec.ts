import { describe, expect, it } from "vitest";
import handler from "./index.api";
import { retrieveBooks, createBook } from "./interaction";

import httpMocks from "node-mocks-http";

describe("Test Book DB Interactions", () => {
    it("retrieveBooks", async () => {
        await expect(retrieveBooks()).resolves.toEqual([]);
    });

    it("createBook", async () => {
        await expect(createBook({})).resolves.toEqual({});
    });
});

describe("Test Book Endpoints", () => {
    it("POST Handler", () => {
        var request = httpMocks.createRequest({
            method: "POST",
            url: "/book/",
        });

        var response = httpMocks.createResponse();

        handler(request, response);

        expect(response).toEqual({
            status: "204",
            json: {},
        });
    });
});
