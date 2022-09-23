import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenu, HiOutlineMenuAlt4 } from "react-icons/hi";
import clsx from "clsx";
import { useState } from "react";

function Header() {
	const [isActive, setIsActive] = useState(false);
	function clickHandler() {
		setIsActive(true);
	}
	function closeDiv() {}

	return (
		<>
			<div
				className={clsx(
					!isActive
						? "invisible absolute opacity-0 "
						: "max-w-mobile absolute z-10 flex h-[600px] w-mobile flex-col gap-2 bg-customGreen  opacity-100  duration-500"
				)}
			>
				<button className="relative mt-36 ml-10 flex  flex-col font-[sora] text-[36px]  font-extrabold tracking-wider text-customYellow outline-none ">
					<button onClick={() => setIsActive(false)}>
						<AiOutlineClose className="absolute -top-16 -left-5 h-7 w-7 text-slate-500 " />
					</button>
					<p className=" font-sora active:text-green-500">home</p>
					<p className=" active:text-green-500">my library</p>
					<p className="underline active:text-green-500">favorites</p>
					<p className="active:text-green-500">requests</p>
					<p className="active:text-green-500">explore</p>
				</button>
			</div>
			<div className="mt-2 flex w-mobile border-y-[1px] border-t-[1px] border-slate-300">
				<button onClick={clickHandler} className="self-center pl-2 outline-none">
					<HiOutlineMenuAlt4 className="h-8 w-8  text-slate-300 " />
				</button>
				<div
					className="w-mobile
				text-center font-sora  text-[34px] font-extrabold tracking-[4px] text-customYellow"
				>
					bookshare
				</div>
			</div>
		</>
	);
}

export default Header;
