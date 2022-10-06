import { Book } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PutBook } from "../pages/api/book/model.zod";

const host =
	process.env.NODE_ENV == "production"
		? process.env.NEXT_PUBLIC_PROD_HOST
		: process.env.NEXT_PUBLIC_DEV_HOST;

export function fetchBook(bookId: string): Promise<Book> {
	return fetch(`http://${host}/api/book/${bookId}`, {
		method: "GET",
	}).then((res) => {
		return res.json();
	});
}

export function useUpdateBook(bookIdentifier: string) {
	const queryClient = useQueryClient();
	return useMutation(
		["books", bookIdentifier, "update"],
		(book: PutBook) => {
			return fetch(`http://${host}/api/book/${bookIdentifier}`, {
				method: "PUT",
				body: JSON.stringify(book),
			});
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["books"]);
			},
		}
	);
}
