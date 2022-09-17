import { TiThMenu } from "react-icons/ti";

export interface HamburgerMenuProps {
	active?: boolean;
	size?: "small" | "medium" | "large";
	children?: any;
	onClick?: () => void;
}

export function HamburgerMenu({
	active,
	size,
	children,
	...props
}: HamburgerMenuProps) {
	return (
		<>
			<button className={size} type="button">
				<TiThMenu />
			</button>
		</>
	);
}
