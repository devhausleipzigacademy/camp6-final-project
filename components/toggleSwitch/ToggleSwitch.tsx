const toggleSwitchColors = {
	0: "bg-customGreen",
	1: "bg-customGrey border-customGrey",
	2: "bg-buttonGrey border-buttonGrey",
};

const toggleSwitchPin = {
	1: "bg-toggleGradient",
	2: "bg-toggleGradient dropShadow-customPin",
};
interface CustomSwitchProps {
	/**
	 * optional text to be displayed to screen readers only
	 */
	text?: string;
	/**
	 * Design of pin element
	 */
	pinDesign: number;
	/**
	 * Design of switch background element
	 */
	switchDesign: number;
	/**
	 * value of button (should that be undefined?)
	 */
	value: boolean | undefined;
	/**
	 * clickhandler for button event
	 */
	clickHandler: any;
}

export function ToggleSwitch({
	text,
	pinDesign = 0,
	switchDesign = 0,
	value,
	clickHandler,
}: CustomSwitchProps) {
	return (
		<label
			htmlFor="priority-switch"
			className="relative mb-4 flex h-4 w-9   
			cursor-pointer items-center"
		>
			<input
				id="priority-switch"
				type="checkbox"
				name="priority"
				className="peer sr-only"
				checked={value}
				onChange={clickHandler}
			/>
			<div
				className="toggle-bg h-full w-full rounded-full bg-buttonGrey shadow-toggleSwitch  
			"
			></div>
			<span className="sr-only ml-3 text-sm font-medium">{text}</span>
		</label>
	);
}
