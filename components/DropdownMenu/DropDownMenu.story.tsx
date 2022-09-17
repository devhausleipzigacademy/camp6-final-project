import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FaDropbox } from "react-icons/fa";
import DropDownMenu from "./DropdownMenu";

export default {
	title: "Dropdown/menu",
	component: DropDownMenu,
	argTypes: {
		onClick: { action: "cliskc" },
	},
} as ComponentMeta<typeof DropDownMenu>;
const Template: ComponentStory<typeof DropDownMenu> = (args) => (
	<DropDownMenu />
);

export const ExampleBook = Template.bind({});
