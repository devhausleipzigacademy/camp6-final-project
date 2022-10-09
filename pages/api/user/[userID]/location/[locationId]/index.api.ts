// package imports
import { Location } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

// local imports
import { ErrorResponse } from "../index.api";
import { deleteLocation, retrieveLocation } from "../interaction";
import { GetLocation, getLocation } from "../model.zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Location | GetLocation | { id: string } | ErrorResponse>
) {
	try {
		if (req.method === "GET") {
			const locationId = req.query.locationId as string;

			const location = await retrieveLocation(locationId);

			const parsedLocation = getLocation.parse(location);
			res.status(200).json(parsedLocation);
		}
		if (req.method === "DELETE") {
			const locationId = req.query.locationId as string;

			const deletedLocation = await deleteLocation(locationId);

			res.status(200).json(deletedLocation);
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

		res.status(404).send(errorResponse);
	}
}
