import { ReactNode } from "react";
import "./button.css";
import clsx from "clsx";

const FUNCTIONS = {
	Genre: "font-serif text-gray-500",
	External: "text-white font-semibold ",
	FormSubmit: "font-sans font-bold text-white",
};

const SIZES = {
	Small: "h-10 w-fit",
	Medium: "h-12 w-fit px-4",
	Large: "h-12 w-5/6",
};

type ButtonType = "button" | "submit" | "reset" | undefined;

interface ButtonProps {
	/**
	 * Choose from three functions
	 */
	functionality: keyof typeof FUNCTIONS;
	/**
	 * What background color to use
	 */
	backgroundColor?: string;
	/**
	 * How large should the button be?
	 */
	size?: keyof typeof SIZES;
	/**
	 * Button contents
	 */
	children: ReactNode;
	/**
	 * Optional label
	 */
	label?: string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
	children,
	size = "Small",
	functionality = "Genre",
	label,
	backgroundColor = "blue",

	...props
}: ButtonProps) => {
	// default button props
	let type = "button" as ButtonType;
	let classes = FUNCTIONS.FormSubmit;
	let dimension = SIZES.Small;

	switch (functionality) {
		case "Genre":
			classes = FUNCTIONS.Genre;
			backgroundColor = "Aquamarine";
			break;
		case "FormSubmit":
			type = "submit";
			backgroundColor = "OliveDrab";
			break;
		case "External":
			classes = FUNCTIONS.External;
			backgroundColor = "OliveDrab";
			break;
	}

	switch (size) {
		case "Small":
			dimension = SIZES.Small;
			break;
		case "Medium":
			dimension = SIZES.Medium;
			break;
		case "Large":
			dimension = SIZES.Large;
			break;
	}

	return (
		<>
			<button
				type={type}
				className={clsx(
					"rounded-md py-1 px-2 text-sm shadow-md",
					classes,
					dimension
				)}
				style={{ backgroundColor }}
				{...props}
			>
				{children}
				{label}
			</button>
		</>
	);
};
