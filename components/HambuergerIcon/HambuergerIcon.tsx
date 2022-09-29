import { HiOutlineMenuAlt4 } from "react-icons/hi";

interface HamburgerProps {
	size?: "small" | "medium" | "large";
	onClick: () => void;
}

export function HamburgerIcon({ size = "medium", ...probs }) {
	const sizes = {
		small: "h-3 w-3",
		medium: "h-5 w-5",
		large: "h-7 w-7",
	};
	return (
		<>
			<button {...probs}>
				<HiOutlineMenuAlt4 className={size} />
			</button>
		</>
	);
}
