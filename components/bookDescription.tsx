import { GrLocation } from "react-icons/gr";
import { FaTelegram } from "react-icons/fa";
import { HiChevronLeft } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";

function event() {
	return console.log("event triggered");
}
function BookDescription() {
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
							src="/public/testingImages/book.jpg"
							alt="Picture of the author"
							width={215}
							height={300}
						/>
						<div className="flex flex-col items-center">
							<p className="font-bold text-2xl">Palate Pallete</p>
							<p className="text-slate-500 text-lg">by Viktionary</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col ml-10 pl-2">
					<div className=" border-l-2 pl-2">
						<p className="mb-2 text-xl font-bold">Description</p>
						<p className="text-gray-400">
							Palate Palette was inspired by a simple question that floated around the
							victionary studio one day: ‘What do the best artists/illustrators around
							the world love to eat?’
						</p>
					</div>
					<div className="flex mt-4 gap-2">
						<div className="bg-[#fef1e0] w-fit p-4 rounded-xl ">Art</div>
						<div className="bg-[#fbe9e6] w-fit p-4 rounded-xl">Food & Drinks</div>
					</div>
				</div>
				<div className="flex gap-7 my-10">
					<button onClick={event}>
						<div className="bg-slate-300 gap-1 p-6 items-center flex rounded-2xl ">
							<GrLocation />
							<p>open in maps</p>
						</div>
					</button>
					<button onClick={event}>
						<div className="bg-slate-300 flex gap-1 rounded-2xl items-center p-6">
							<FaTelegram />
							<p>message user</p>
						</div>
					</button>
				</div>
			</div>
		</>
	);
}

export default BookDescription;
