import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

export function Header() {
	const router = useRouter();

	const pages = [
		{ name: "home", href: "/" },
		{ name: "my library", href: "/library" },
		{ name: "favorites", href: "/favorites" },
		{ name: "requests", href: "/requests" },
		{ name: "explore", href: "/explore" },
	];

	return (
		<div className=" h-header relative flex w-screen flex-row items-center justify-center border-y border-grey py-2 ">
			<Menu>
				{({ open }) => (
					<>
						<Menu.Button
							className={" absolute left-3 top-4 mr-2 text-grey outline-none "}
						>
							{open ? (
								<AiOutlineClose
									className={clsx(
										" absolute z-30 h-8 w-8 text-yellow duration-500"
									)}
								/>
							) : (
								<HiOutlineMenuAlt4
									className={clsx(
										"-z-30 h-8 w-8 text-grey outline-none duration-1000",

										" h-8 w-8 text-grey outline-none",
										open ? "" : " opacity-100"
									)}
								/>
							)}
						</Menu.Button>

						<Transition
							className={
								" absolute left-0 top-0 z-20 flex h-screen w-screen flex-col justify-center overflow-clip bg-green outline-none duration-500 sm:min-h-screen sm:w-screen lg:w-1/2"
							}
							enter="transition duration-500 ease-in-out"
							enterFrom="transform scale-x-0 opacity-0"
							enterTo="transform scale-x-full origin-left opacity-100"
							leave="transition duration-300 duration-300 ease-out"
							leaveFrom="transform scale-x-full opacity-100"
							leaveTo="transform scale-x-0 origin-left opacity-0"
						>
							<Menu.Items>
								<div className="duration-400 flex translate-x-10 flex-col gap-4 	text-start font-sora text-4xl text-yellow outline-none">
									{pages.map(({ name: pageName, href: hrefLink }, index) => (
										<Menu.Item
											as="a"
											href={hrefLink}
											key={hrefLink}
											className={clsx(
												"w-fit ",
												router.pathname == hrefLink
													? "underline underline-offset-4 "
													: ""
											)}
										>
											{pageName}
										</Menu.Item>
									))}
								</div>
							</Menu.Items>
						</Transition>
					</>
				)}
			</Menu>
			<Link href={"/"}>
				<a className="font-sora text-4xl font-extrabold tracking-wider text-yellow">
					bookshare
				</a>
			</Link>
			<Menu>
				{({ open }) => (
					/* Use the `open` state to conditionally change the direction of the chevron icon. */

					<>
						<Menu.Button
							className={" absolute right-3 top-4 mr-2 text-grey outline-none "}
						>
							{open ? (
								<AiOutlineClose className="absolute right-0 -top-1 z-30 h-8 w-8 text-yellow duration-500" />
							) : (
								<BiUser
									className={clsx(
										"h-7 w-8 outline-none duration-1000",

										open ? " " : "text-grey "
									)}
								/>
							)}
						</Menu.Button>

						<Transition
							className={
								" absolute right-0 top-0 z-20 flex h-screen w-screen flex-col justify-center overflow-clip bg-green outline-none duration-500 sm:min-h-screen sm:w-screen lg:w-1/2"
							}
							enter="transition duration-500 ease-in-out"
							enterFrom="transform -scale-x-0 opacity-0"
							enterTo="transform -scale-x-full origin-right opacity-100"
							leave="transition duration-300 duration-300 ease-out"
							leaveFrom="transform s-cale-x-full opacity-100"
							leaveTo="transform -scale-x-0 origin-right opacity-0"
						>
							<Menu.Items>
								<div className="duration-400 flex translate-x-10 flex-col gap-4	text-end font-sora text-4xl text-yellow outline-none">
									{[
										{
											name: "settings",
											href: "/settings",
										},
										{ name: "sign out", href: "/sign out" },
									].map(({ name: pageName, href: hrefLink }, index) => (
										<Menu.Item
											as="a"
											href={hrefLink}
											key={hrefLink}
											className={"w-fit"}
										>
											{pageName}
										</Menu.Item>
									))}
								</div>
							</Menu.Items>
						</Transition>
					</>
				)}
			</Menu>
		</div>
	);
}

export default Header;
