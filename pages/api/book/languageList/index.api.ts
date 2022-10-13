import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import { ErrorResponse } from "../index.api";
import { searchBookLanguages } from "../interaction";
import { GetBook } from "../model.zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GetBook[] | { identifier: string } | ErrorResponse>
) {
	try {
		if (req.method === "GET") {
			const languageCount = await searchBookLanguages();

			res.status(200).json(languageCount);
		}
	} catch (err) {
		if (err instanceof ZodError) {
			const errorResponse: ErrorResponse = {
				message: "Invalid search.",
			};
			if (["development", "test"].includes(process.env.NODE_ENV)) {
				errorResponse.error = err;
			}
			res.status(422).send(errorResponse);
		}

		const errorResponse: ErrorResponse = {
			message: "Looks like the brown bear went wrong. Please try again.",
		};
		if (["development", "test"].includes(process.env.NODE_ENV)) {
			errorResponse.error = err;
		}
		res.status(400).send(errorResponse);
	}
}
