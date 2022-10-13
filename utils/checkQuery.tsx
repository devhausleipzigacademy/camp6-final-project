import { ReactElement } from "react";

interface checkQueryProps {
	queryStatus: "error" | "success" | "loading";
	queryItem: any;
	queryName: string;
	successReturn: ReactElement<any, any>;
}

export default function checkQuery({
	queryStatus,
	queryItem,
	queryName,
	successReturn,
}: checkQueryProps): ReactElement<any, any> {
	if (queryStatus === "loading")
		return <p className="m-6 font-montserrat text-textGrey">Loading...</p>;

	if (queryStatus === "error")
		return (
			<div className="flex h-screen w-full flex-col items-center justify-center">
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFgCFmiB0pQYHGDklq0EZX35hq-EuOP7N8Xg&usqp=CAU" />
				<p className="font-montserrat text-textGrey">
					Something went wrong. Please try again later.
				</p>
			</div>
		);

	if (queryItem === undefined)
		return (
			<p className="m-6 font-montserrat text-textGrey">
				Something went wrong. Please try again later.
			</p>
		);

	if (queryItem.length === 0)
		return (
			<p className="m-6 font-montserrat text-textGrey">No {queryName} found.</p>
		);

	return successReturn;
}