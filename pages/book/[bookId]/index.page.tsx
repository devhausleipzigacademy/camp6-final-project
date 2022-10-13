import Image from "next/future/image";
import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiChevronLeft } from "react-icons/hi";
import { ExampleTags } from "../../../components/bookDescription/BookDescription.story";
import { CustomButton } from "../../../components/button/Button";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@prisma/client";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import fetchBook from "../../../utils/fetchBook";
import checkQuery from "../../../utils/checkQuery";

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

export default function BookDescription() {
	const router = useRouter();
	const { bookId } = router.query;

	const { data: book, status } = useQuery<Book>(
		["getBook", bookId],
		() => fetchBook(String(bookId)),
		{
			enabled: bookId.length > 0,
		}
	);

	const bookDescriptionContent = (
		<div className="flex w-mobile flex-col items-stretch py-5 px-10">
			<div className="relative my-5 h-fit rounded-3xl bg-[#fef1e0] px-36 py-20 ">
				<div>
					<button
						onClick={() => router.back()}
						className="absolute  left-1 top-4"
					>
						<HiChevronLeft className="h-10 w-10" />
					</button>
					<button onClick={() => {}} className="absolute top-4 right-3">
						<AiOutlineHeart className="h-8 w-8" />
					</button>
				</div>
				<div className="flex flex-col items-center">
					<Image
						className="rounded-xl "
						src={book?.image ? book.image : "https://picsum.photos/80/120"}
						width={80}
						height={120}
						alt={book.title ? book.title : "no title"}
					/>
					<div className="flex flex-col items-center">
						<p className="text-2xl font-bold">{book.title}</p>
						<p className="text-slate-500 text-lg">by {book.author}</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col pl-2">
				<div className=" border-l-2 pl-2">
					<p className="mb-2 text-xl font-bold">Description</p>
					<p className="text-gray-400">{book.description}</p>
				</div>
				<ExampleTags tags={[...Array(book.genres)]} />
			</div>
			<div className="my-10 flex justify-center gap-7">
				<CustomButton onClick={() => {}} functionality="ExternalApp">
					<FaTelegram />
					Message user
				</CustomButton>
				<CustomButton onClick={() => {}} functionality="ExternalApp">
					<GoLocation className="text-white" />
					Open in maps
				</CustomButton>
			</div>
		</div>
	);

	const queryCheck = checkQuery({
		queryStatus: status,
		queryItem: book,
		queryName: "book",
		successReturn: bookDescriptionContent,
	});
	return queryCheck;
}
