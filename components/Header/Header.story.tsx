import { ComponentMeta, ComponentStory } from "@storybook/react";
import Header from "./header";

export default {
	title: "Header",
	component: "Header",
} as unknown as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header />;

export const header = Template.bind({});
