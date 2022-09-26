import { AiOutlineClose } from "react-icons/ai";

import { HiOutlineMenu, HiOutlineMenuAlt4 } from "react-icons/hi";
import clsx from "clsx";
import { useState } from "react";
import { avatarList, Avatars } from "../Avatars/Avatars";
import { randomInt } from "crypto";

export function Header() {
	const avatar = "https://avatars.dicebear.com/api/bottts/5.svg?size=40";
	const [isActive, setIsActive] = useState(false);
	const [isActive2, setIsActive2] = useState(false);
	function clickHandler() {
		if (isActive2) {
			setIsActive2(false);
		}
		setIsActive((prev) => !prev);
	}
	function clickHandler2() {
		if (isActive) {
			setIsActive(false);
		}
		setIsActive2((prev) => !prev);
	}

	return (
		<>
			<div className="  min-w-mobile relative flex border-y-[1px] border-t-[1px] border-slate-300">
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
							? " invisible absolute flex h-[600px] w-0 flex-col opacity-0 duration-500"
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
				<button
					onClick={clickHandler2}
					className="absolute right-2 mr-2  outline-none "
				>
					{isActive2 ? (
						<AiOutlineClose className=" absolute top-3 right-2  z-50 mb-2  h-7 w-7 text-slate-400  outline-none  duration-500" />
					) : (
						<img
							src={avatar}
							alt=""
							className={
								isActive
									? "invisible mt-2 opacity-0 outline-none duration-500"
									: "mt-2 opacity-100 outline-none duration-500"
							}
						/>
					)}
				</button>
				<div
					className={clsx(
						!isActive2
							? " invisible absolute right-0 flex h-[600px] w-1 flex-col opacity-0 duration-500 "
							: "  absolute right-0 flex   h-[600px] w-mobile flex-col gap-2  bg-customGreen   opacity-100  duration-500"
					)}
				>
					<button className="= mr-20 mt-36 flex  flex-col self-end  font-[sora] text-[36px]  font-extrabold tracking-wider text-customYellow outline-none ">
						<p className=" font-sora active:text-green-500">settings</p>
						<p className=" active:text-green-500">sign out</p>
					</button>
				</div>
			</div>
		</>
	);
}

export default Header;
