import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
	title: "SearchBars/HomeSearchBar",
	component: "HomeSearchBar",
} as unknown as ComponentMeta<typeof HomeSearchBar>;

const Template: ComponentStory<typeof HomeSearchBar> = (args) => (
	<HomeSearchBar {...args} />
);

export const HomeSearchBar = Template.bind({});
