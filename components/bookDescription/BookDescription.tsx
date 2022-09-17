import { GrLocation } from "react-icons/gr";
import { FaTelegram } from "react-icons/fa";
import { HiChevronLeft } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import { type } from "os";
import { ReactNode } from "react";

function event() {
	return console.log("event triggered");
}

export type BookDescriptionProps = {
	backButtonHandler: Function;
	likedButtonHandler: Function;
	title: String;
	author: String;
	description: String;
	image: String;
	children: [ReactNode, ReactNode, ReactNode];
};

export function BookDescription({
	backButtonHandler,
	likedButtonHandler,
	title,
	author,
	description,
	image,
	children,
}: BookDescriptionProps) {
	const [Tags, GoogleButton, TelegramButton] = children;

	const myLoader = () => {
		return `http://gingkopress.com/wp/wp-content/uploads/product_images/palate-palette/c01.jpg`;
	};
	return (
		<>
			<div className="w-mobile flex flex-col py-5 items-center">
				<div className="bg-[#fef1e0] px-36 h-fit  relative rounded-3xl py-20 my-5 ">
					<div>
						<button onClick={event} className="absolute  left-1 top-4">
							<HiChevronLeft className="h-10 w-10" />
						</button>
						<button onClick={event} className="absolute top-4 right-3">
							<AiOutlineHeart className="h-8 w-8" />
						</button>
					</div>
					<div className="">
						<Image
							className="rounded-xl "
							loader={myLoader}
							src={image as string}
							alt="Picture of the author"
							width={215}
							height={300}
						/>
						<div className="flex flex-col items-center">
							<p className="font-bold text-2xl">{title}</p>
							<p className="text-slate-500 text-lg">by {author}</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col ml-10 pl-2">
					<div className=" border-l-2 pl-2">
						<p className="mb-2 text-xl font-bold">Description</p>
						<p className="text-gray-400">{description}</p>
					</div>
					<p>{Tags}</p>
				</div>
				<div className="flex gap-7 my-10">
					<button>{GoogleButton}</button>
					<button>{TelegramButton}</button>
				</div>
			</div>
		</>
	);
}

export default BookDescription;
