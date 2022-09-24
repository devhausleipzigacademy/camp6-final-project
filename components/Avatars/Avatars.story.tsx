import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Component } from "react";
import { Avatars } from "./Avatars";

export default {
	title: "Avatars/Component",
	component: Avatars,
} as ComponentMeta<typeof Avatars>;

const Template: ComponentStory<typeof Avatars> = (args) => (
	<Avatars {...args} />
);

export const Avatar = Template.bind({});

Avatar.args = {
	number: "",
};
