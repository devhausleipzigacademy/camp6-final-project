import clsx from 'clsx';
import { useState } from 'react';
import { TiThMenu } from 'react-icons/ti';

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
	const [isactive, setIsActive] = useState(false);

	function clickHandler(e: any) {
		setIsActive((prev) => !prev);
		e.preventDefault();
		return console.log("sadasd");
	}
	console.log(isactive);
	return (
		<>
			<button onClick={clickHandler}>
				<TiThMenu
					className={clsx(
						isactive ? "text-purple-700" : "text-yellow-500",
						"active:text-green-500 h-10 w-10"
					)}
				/>
			</button>

			<form action=""></form>
		</>
	);
}
