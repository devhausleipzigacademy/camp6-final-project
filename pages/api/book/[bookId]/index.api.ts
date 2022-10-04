// package imports
import { Book } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

// local imports
import { ErrorResponse } from "../index.api";
import { deleteBook, retrieveBook, updateBook } from "../interaction";
import { GetBook, getBook } from "../model.zod";
import { putBook } from "../model.zod";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Book | GetBook | { id: string } | ErrorResponse>
) {
    try {
        if (req.method === "GET") {
            const bookId = req.query.bookId as string;

            const book = await retrieveBook(bookId);

            const parsedBook = getBook.parse(book);
            res.status(200).json(parsedBook);
        }
        if (req.method === "PUT") {
            const data = putBook.parse(req.body);
            const bookId = req.query.bookId as string;

            await updateBook(bookId, data);

            res.status(204).end();
        }
        if (req.method === "DELETE") {
            const bookId = req.query.bookId as string;

            const deletedBook = await deleteBook(bookId);

            res.status(200).json(deletedBook);
        }
    } catch (err) {
        if (err instanceof ZodError) {
            const errorResponse: ErrorResponse = {
                message: "Invalid book.",
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
