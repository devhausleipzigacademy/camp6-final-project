import { ReactNode } from "react";

import clsx from "clsx";

const FUNCTIONS = {
	Genre: "font-serif text-gray-500",
	External: "text-white font-semibold fill-white",
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
	 * What background color to use (only accepts CSS presets for now)
	 */
	backgroundColor?: string;
	/**
	 * How large should the button be (default is small)?
	 */
	size?: keyof typeof SIZES;
	/**
	 * Button contents (can be icon and/or string)
	 */
	children: ReactNode;
	/**
	 * Is the button disabled (optional)?
	 */
	disabled?: boolean;
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
	backgroundColor = "aquamarine",
	disabled = false,

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
					disabled ? "bg-slate-600" : "bg-current",
					classes,
					dimension
				)}
				style={{ backgroundColor }}
				{...props}
				disabled={disabled}
			>
				<div className="flex items-center gap-2">{children}</div>
			</button>
		</>
	);
};
