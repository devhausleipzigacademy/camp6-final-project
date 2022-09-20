import "./button.css";
import Image from "next/future/image";

interface ButtonProps {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean;
	/**
	 * What background color to use
	 */
	backgroundColor?: string;
	/**
	 * How large should the button be?
	 */
	size?: "small" | "medium" | "large";
	/**
	 * Button contents
	 */
	label: string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
	primary = false,
	size = "medium",
	backgroundColor,
	label,
	...props
}: ButtonProps) => {
	const mode = primary
		? "storybook-button--primary"
		: "storybook-button--secondary";
	return (
		<>
			<button
				type="button"
				className={[
					"shadow-xl",
					"storybook-button",
					`storybook-button--${size}`,
					mode,
				].join(" ")}
				style={{ backgroundColor }}
				{...props}
			>
				{label}
			</button>
			{/* The image is just here to show that the image works. */}
			<Image
				width={50}
				height={50}
				alt="It's a cat"
				src="https://ih1.redbubble.net/image.3315780744.1289/pp,504x498-pad,600x600,f8f8f8.jpg"
			/>
		</>
	);
};
