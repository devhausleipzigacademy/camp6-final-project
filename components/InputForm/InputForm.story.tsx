import { ComponentMeta, ComponentStory } from "@storybook/react";
import InputForm from "../../pages/InputForm.page";

export default {
	title: "InputForm",
	component: InputForm,
	argTypes: {
		onClick: { actions: "click" },
	},
} as ComponentMeta<typeof InputForm>;

const Template: ComponentStory<typeof InputForm> = (args) => <InputForm />;

export const Form = Template.bind({});

Form.args = {};
