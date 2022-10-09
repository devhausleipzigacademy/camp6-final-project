import { PutBook } from "../pages/api/book/model.zod";

const host =
	process.env.NODE_ENV == "production"
		? process.env.NEXT_PUBLIC_PROD_HOST
		: process.env.NEXT_PUBLIC_DEV_HOST;

export const updateBook = ({
	bookId,
	book,
}: {
	bookId: string;
	book: PutBook;
}) => {
	return fetch(`http://${host}/api/book/${bookId}`, {
		method: "PUT",
		body: JSON.stringify(book),
	});
};
