import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenu, HiOutlineMenuAlt4 } from "react-icons/hi";
import clsx from "clsx";
import { useState } from "react";

export function Header() {
	const [isActive, setIsActive] = useState(false);
	function clickHandler() {
		setIsActive((prev) => !prev);
	}
	function closeDiv() {}

	return (
		<>
			<div className="mt-2 flex  w-mobile border-y-[1px] border-t-[1px] border-slate-300">
				<button
					onClick={clickHandler}
					className="mb-5 self-center pl-2 outline-none"
				>
					<HiOutlineMenuAlt4
						className={clsx(
							isActive
								? " invisible absolute w-0 opacity-0 "
								: "absolute  mb-2 flex h-6  w-7 text-slate-400  opacity-100  duration-500"
						)}
					/>
					<AiOutlineClose
						className={clsx(
							!isActive
								? " invisible absolute w-0 opacity-0 "
								: "   absolute z-50 mb-2 h-6 w-7 text-slate-400  opacity-100  duration-500"
						)}
					/>
				</button>
				<div
					className={clsx(
						!isActive
							? " invisible absolute w-0 opacity-0 "
							: "  absolute  flex h-[600px] w-mobile  flex-col gap-2 bg-customGreen  opacity-100  duration-500"
					)}
				>
					<button className="= mt-36 ml-10 flex  flex-col font-[sora] text-[36px]  font-extrabold tracking-wider text-customYellow outline-none ">
						<p className=" font-sora active:text-green-500">home</p>
						<p className=" active:text-green-500">my library</p>
						<p className="underline active:text-green-500">favorites</p>
						<p className="active:text-green-500">requests</p>
						<p className="active:text-green-500">explore</p>
					</button>
				</div>
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
