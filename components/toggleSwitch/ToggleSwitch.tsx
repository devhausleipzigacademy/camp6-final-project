interface CustomSwitchProps {
	/**
	 * optional text to be displayed to screen readers only
	 */
	text?: string;
	/**
	 * value of button (should that be undefined?)
	 */
	value: boolean | undefined;
	/**
	 * clickhandler for button event
	 */
	clickHandler: any;
}

export function ToggleSwitch({ text, value, clickHandler }: CustomSwitchProps) {
	return (
		<label
			htmlFor="priority-switch"
			className="relative mb-4 flex h-6 w-11 cursor-pointer items-center"
		>
			<input
				id="priority-switch"
				type="checkbox"
				name="priority"
				className="peer sr-only"
				checked={value}
				onChange={clickHandler}
			/>
			<div className="toggle-bg h-full w-full rounded-full border-2 border-slate-300 bg-slate-300"></div>
			<span className="sr-only ml-3 text-sm font-medium">{text}</span>
		</label>
	);
}
