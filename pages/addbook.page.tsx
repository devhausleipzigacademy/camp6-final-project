import React, { useEffect, useState } from "react";
import router from "next/router";
import { VscChromeClose } from "react-icons/vsc";
import InputForm from "../components/inputForm/InputForm";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../utils/fetchUser";

export default function AddBook() {
	const [ownerId, setOwnerId] = useState();

	useEffect(() => {
		const userId = localStorage.getItem("c6-tid");
		if (!userId) {
			router.replace("/login");
		}
	}, []);

	const { data: user, status: userStatus } = useQuery<User>(
		["books"],
		() => fetchUser(ownerId),
		{ enabled: !!ownerId }
	);
	console.log(ownerId);

	if (userStatus === "loading")
		return (
			<p className="mt-10 flex justify-center font-montserrat text-base text-textGrey">
				Loading...
			</p>
		);

	if (userStatus === "error")
		return (
			<div className="flex h-screen w-full flex-col items-center justify-center">
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFgCFmiB0pQYHGDklq0EZX35hq-EuOP7N8Xg&usqp=CAU" />
				<p className="mt-10 flex justify-center font-montserrat text-base text-textGrey">
					Something went wrong. Please try again later.
				</p>
			</div>
		);

	if (user === undefined)
		return (
			<p className="mt-10 flex justify-center font-montserrat text-base text-textGrey">
				Something went wrong. Please try again later.
			</p>
		);

	return (
		<>
			<div className="-top-4 border-b-0.75 border-grey bg-white pb-4">
				<button onClick={() => router.back()}>
					<VscChromeClose className="absolute mt-1 ml-7 h-6 w-6 text-textGrey" />
				</button>

				<h2 className="text-center font-arno text-2xl font-semibold text-dustyRose">
					New Book Information
				</h2>
			</div>
			<InputForm formType={"create"} ownerId={user.identifier} />;
		</>
	);
}
