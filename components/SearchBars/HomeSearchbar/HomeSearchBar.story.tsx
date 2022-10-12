import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HomeSearchBar } from "./HomeSearchBar";

export default {
	title: "SearchBars/HomeSearchBar",
	component: HomeSearchBar,
} as ComponentMeta<typeof HomeSearchBar>;

const Template: ComponentStory<typeof HomeSearchBar> = (args) => (
	<HomeSearchBar {...args} />
);

export const SearchBar = Template.bind({});
