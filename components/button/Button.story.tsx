import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FaTelegram } from "react-icons/fa";

import { CustomButton } from "./Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Book Share/Components/Button",
	component: CustomButton,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof CustomButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomButton> = (args) => (
	<CustomButton {...args} />
);

export const Genre = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Genre.args = {
	customDesigns: "Genre",
	children: ["Fine Dining"],
};

export const External = Template.bind({});
External.args = {
	customDesigns: "ExternalApp",
	children: [<FaTelegram />, "message user"],
};

export const FormSubmit = Template.bind({});
FormSubmit.args = {
	customDesigns: "ConfirmationPrimary",
	children: ["Submit a book"],
};

export const Disabled = Template.bind({});
Disabled.args = {
	customDesigns: "ConfirmationSecondary",
	children: ["no, not this one"],
};
