// package imports
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { ZodError } from "zod";

// local imports
import { postBook, PostBook, getBook, GetBook } from "./model.zod";
import { createBook, retrieveBooks } from "./interaction";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        GetBook[] | { id: string } | { message: string; error: any }
    >
) {
    try {
        if (req.method === "GET") {
            // space to add search filters at some later stage in time

            const books = await retrieveBooks();
            const parsedBooks = books.map((book) => getBook.parse(book));

            res.status(200).json(parsedBooks);
        }
        if (req.method === "POST") {
            const data = postBook.parse(req.body);
            const book = await createBook(data);

            res.status(201).json({ id: book.identifier });
        }
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(422).send({
                message: "Invalid book.",
                error: process.env.NODE_ENV == "development" ? err : undefined,
            });
        }
        res.status(400).send({
            message: "Looks like something went wrong. Please try again.",
            error: process.env.NODE_ENV == "development" ? err : undefined,
        });
    }
}
