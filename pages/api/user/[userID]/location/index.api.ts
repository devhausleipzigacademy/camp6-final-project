// package imports
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

// local imports
import { postLocation, getLocation, GetLocation } from "./model.zod";
import { createLocation, retrieveLocations } from "./interaction";

export type ErrorResponse = {
	message: string;
	error?: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GetLocation[] | { identifier: string } | ErrorResponse>
) {
	try {
		if (req.method === "GET") {
			// Search parameters (we could add more, e.g. orderBy)
			const { hasBooks } = req.query as Record<string, string>;

			const clauses: Array<Prisma.LocationWhereInput> = [];

			if (hasBooks !== undefined) {
				clauses.push(
					hasBooks == "true"
						? { NOT: { books: { none: {} } } }
						: hasBooks == "false"
						? { books: { none: {} } }
						: undefined
				);
			}

			const locations = await retrieveLocations(clauses);

			const parsedLocations = locations.map((location) =>
				getLocation.parse(location)
			);

			res.status(200).json(parsedLocations);
		}
		if (req.method === "POST") {
			const userId = req.query.userId as string;

			console.log("query:", userId);
			const data = postLocation.parse(req.body);
			// console.log(data);
			const location = await createLocation(userId, data);

			res.status(201).json({ identifier: location.identifier });
		}
	} catch (err) {
		if (err instanceof ZodError) {
			const errorResponse: ErrorResponse = {
				message: "Invalid location.",
			};
			if (["development", "test"].includes(process.env.NODE_ENV)) {
				errorResponse.error = err;
			}
			res.status(422).send(errorResponse);
		}

		const errorResponse: ErrorResponse = {
			message: "Looks like something went wrong. Please try again.",
		};
		if (["development", "test"].includes(process.env.NODE_ENV)) {
			errorResponse.error = err;
		}
		res.status(400).send(errorResponse);
	}
}
