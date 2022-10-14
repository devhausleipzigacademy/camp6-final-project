import { Book } from "@prisma/client";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import router, { useRouter } from "next/router";
import { VscChromeClose } from "react-icons/vsc";
import InputForm from "../../../components/inputForm/InputForm";
import fetchBook from "../../../utils/fetchBook";

export async function getStaticProps({ params }) {
	const { bookId } = params;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		["getBook", bookId],
		() => fetchBook(bookId),
		{
			staleTime: 360000,
		}
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking",
	};
}

export default function EditBook() {
	const router = useRouter();
	const { bookId } = router.query;

	const { data: book, status } = useQuery<Book>(
		["getBook", bookId],
		() => fetchBook(String(bookId)),
		{
			enabled: bookId.length > 0,
		}
	);

	if (status === "loading")
		return <p className="m-6 font-montserrat text-textGrey ">Loading...</p>;

	if (status === "error")
		return <p className="m-6 font-montserrat text-textGrey ">No book found.</p>;

	return (
		<>
			<div className="-top-4 border-b-0.75 border-grey bg-white pb-4">
				<button onClick={() => router.back()}>
					<VscChromeClose className="absolute mt-1 ml-7 h-6 w-6 text-textGrey" />
				</button>

				<h2 className="text-center font-arno text-2xl font-semibold text-dustyRose">
					Update Book Information
				</h2>
			</div>
			<InputForm
				formType={"update"}
				ownerId={book.ownerId}
				oldBookData={book}
			/>
			;
		</>
	);
}
