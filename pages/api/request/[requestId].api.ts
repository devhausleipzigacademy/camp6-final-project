import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { ErrorResponse } from "./index.api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<undefined | ErrorResponse>
) {
  try {
    if (req.method === "DELETE") {
      const requestId = req.query.requestId as string;

      const deletedRequest = await prisma.request.delete({
        where: { identifier: requestId },
      });

      res.status(204).end();
    }
  } catch (err) {
    const errorResponse: ErrorResponse = {
      message: "Looks like something went wrong. Please try again.",
    };
    if (["development", "test"].includes(process.env.NODE_ENV)) {
      errorResponse.error = err;
    }

    res.status(404).send(errorResponse);
  }
}
