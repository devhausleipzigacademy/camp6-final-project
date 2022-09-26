import clsx from "clsx";
import { ReactNode } from "react";
import { FaTelegram } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import BookArrowUpSvg from "../bookarrowupsvg/BookArrowUpSvg";

const customDesigns = {
	AddBook:
		"h-10 w-10 rounded-full bg-yellow fill-black p-2 text-black drop-shadow-plusButton",
	ConfirmationPrimary:
		"h-12 min-h-fit w-48 min-w-fit rounded-2xl bg-green fill-white p-2 font-serif text-base font-semibold text-white drop-shadow",
	ConfirmationSecondary:
		"bg-transparent h-12 min-h-fit w-48 min-w-fit rounded-2xl fill-grey p-2 font-serif text-base font-semibold text-grey",
	ExternalApp:
		"min-w-40 min-h-12 max-h-fit max-w-fit rounded-2xl bg-green fill-white p-2 font-serif text-base font-semibold text-white drop-shadow",
	Genre: "",
	// "font-serif text-gray-500",
	LibraryMessage:
		"h-5 min-h-fit w-25 min-w-fit rounded-2xl border border-brown p-1 font-serif text-2xs font-semibold text-brown",
	LibraryReturned:
		"h-5 min-h-fit w-25 min-w-fit rounded-2xl border border-green p-1 font-serif text-2xs font-semibold text-green",
};

type ButtonType = "button" | "submit" | "reset" | undefined;

interface ButtonProps {
	/**
	 * Choose from seven functions
	 */
	functionality: keyof typeof customDesigns;
	/**
	 * Button contents (can be icon and/or string)
	 */
	children?: ReactNode;
	/**
	 * Is the button disabled (optional)?
	 */
	disabled?: boolean;
	/**
	 * Click handler
	 */
	onClick: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const CustomButton = ({
	children,
	functionality,
	disabled = false,

	...props
}: ButtonProps) => {
	// default button props
	let type: ButtonType;
	let classes;

	switch (functionality) {
		case "AddBook":
			type = "button";
			classes = customDesigns.AddBook;
			children = <FiPlus className="h-5" />;

			break;
		case "ConfirmationPrimary":
			type = "submit";
			classes = customDesigns.ConfirmationPrimary;

			break;
		case "ConfirmationSecondary":
			type = "button";
			classes = customDesigns.ConfirmationSecondary;
			break;
		case "ExternalApp":
			type = "button";
			classes = customDesigns.ExternalApp;

			break;
		case "Genre":
			type = "button";
			classes = customDesigns.Genre;

			break;
		case "LibraryMessage":
			type = "button";
			classes = customDesigns.LibraryMessage;
			children = [<FaTelegram />, "Send message"];

			break;
		case "LibraryReturned":
			type = "button";
			classes = customDesigns.LibraryReturned;
			children = [
				<BookArrowUpSvg className="h-2.5 w-2.5" />,
				"Mark as returned",
			];
			break;
	}

	return (
		<>
			<button
				type={type}
				className={clsx(
					"h-5 min-h-fit w-25 min-w-fit rounded-2xl border border-brown p-1 font-serif text-2xs font-semibold text-brown ",
					disabled ? "bg-grey" : "bg-current",
					classes
				)}
				{...props}
				disabled={disabled}
			>
				<div className="flex h-full w-full items-center justify-center gap-1.5">
					{/* {children} */}
					<FaTelegram /> Send message
				</div>
			</button>
		</>
	);
};
