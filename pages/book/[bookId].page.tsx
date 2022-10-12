import Image from "next/future/image";

import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiChevronLeft } from "react-icons/hi";
import { ExampleTags } from "../../components/bookDescription/BookDescription.story";
import { CustomButton } from "../../components/button/Button";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@prisma/client";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchBook } from "../../utils/fetchBook";
import { InferGetStaticPropsType } from "next";
import { randomInt } from "crypto";

const tagColors = [
	"bg-blue",
	"bg-dustyRose",
	"bg-salmon",
	"bg-yellow",
	"bg-green",
	"bg-linen",
];
export async function getStaticProps({ params }) {
	const { bookId } = params;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(["getBook", bookId], () => fetchBook(bookId), {
		staleTime: 360000,
	});

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

export default function BookDescription(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	const router = useRouter();
	const { bookId } = router.query;

	const { data: book } = useQuery<Book>(
		["getBook", bookId],
		() => fetchBook(String(bookId)),
		{
			enabled: bookId.length > 0,
		}
	);

	return (
		<div className="mx-10  flex h-screen flex-col justify-center  px-1 ">
			<div className="relative my-5 h-full rounded-3xl  bg-[#fef1e0] px-36 py-10 ">
				<div>
					<button onClick={() => router.back()} className="absolute  left-1 top-4">
						<HiChevronLeft className="h-10 w-10" />
					</button>
					<button
						onClick={() => {
							console.log("favorite");
						}}
						className="absolute top-4 right-3"
					>
						<AiOutlineHeart className="h-8 w-8" />
					</button>
				</div>
				<div className="flex flex-col items-center">
					<Image
						className="rounded-xl "
						src={book.image ? book.image : "https://picsum.photos/80/120"}
						fill={true}
						alt={book.title}
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
			</div>
			<div className="mt-4 ml-1 flex gap-2">
				{Object.entries(book.genres).map((x, index) => (
					<>
						<p
							className={`${
								tagColors[index % tagColors.length]
							} w-fit rounded-lg   px-2  py-1 text-black`}
						>
							{x}
						</p>
					</>
				))}
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
}
