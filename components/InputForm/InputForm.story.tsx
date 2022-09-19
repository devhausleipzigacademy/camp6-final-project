import { ComponentMeta, ComponentStory } from "@storybook/react";
import InputForm from "./InputForm";

export default {
	title: "InputForm",
	component: InputForm,
	argTypes: {},
} as ComponentMeta<typeof InputForm>;

const Template: ComponentStory<typeof InputForm> = (args) => (
	<InputForm {...args} />
);

export const Form = Template.bind({});
