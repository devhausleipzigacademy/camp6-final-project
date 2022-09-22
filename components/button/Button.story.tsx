import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { FaTelegram } from 'react-icons/fa';

import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Book Share/Components/Button",
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Genre = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Genre.args = {
	functionality: "Genre",
	backgroundColor: "aquamarine",
	children: ["Fine Dining"],
};

export const External = Template.bind({});
External.args = {
	functionality: "External",
	backgroundColor: "OliveDrab",
	children: [<FaTelegram />, "message user"],
};

export const FormSubmit = Template.bind({});
FormSubmit.args = {
	functionality: "FormSubmit",
	children: ["Submit a book"],
	backgroundColor: "OliveDrab",
};

export const Disabled = Template.bind({});
Disabled.args = {
	functionality: "FormSubmit",
	children: ["Are you sure?"],
	disabled: true,
};
