// package imports
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

// local imports

import { Request } from "@prisma/client";
import { prisma } from "../../../prisma/db";
import { request } from "http";
import { connect } from "http2";

export type ErrorResponse = {
  message: string;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Request[] | { identifier: string } | ErrorResponse>
) {
  const { bookId } = req.query;
  try {
    if (req.method === "GET") {
      // space to add search filters at some later stage in time

      const requests = await prisma.request.findMany({
        include: { requester: true, book: true },
      });

      res.status(200).json(requests);
    }
    if (req.method === "POST") {
    }
    if (req.method === "DELETE") {
      const requests = await prisma.request.findMany({
        where: { bookId: bookId as string },
      });
      await prisma.request.deleteMany({
        where: {
          OR: requests.map((request) => {
            return {
              identifier: request.identifier,
            };
          }),
        },
      });
      res.status(204).end();
    }
  } catch (err) {
    if (err instanceof ZodError) {
      const errorResponse: ErrorResponse = {
        message: "Invalid borrow request.",
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
