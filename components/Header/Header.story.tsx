import { ComponentMeta, ComponentStory } from "@storybook/react";
import Header from "./Header";

export default {
	title: "Header/Component",
	component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header />;

export const header = Template.bind({});