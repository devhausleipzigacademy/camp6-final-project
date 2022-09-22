import { ComponentMeta, ComponentStory } from '@storybook/react';

import { HamburgerMenu } from './HambuergerMenu';

const ex = () => console.log("s");
export default {
	title: "DropDown/Example1HamburgerMenu",
	component: HamburgerMenu,
	argTypes: {
		onClick: { action: 'console.log("s")' },
	},
} as ComponentMeta<typeof HamburgerMenu>;

const Template: ComponentStory<typeof HamburgerMenu> = (args) => (
	<HamburgerMenu {...args} />
);

export const HamburgerPrimary = Template.bind({});

HamburgerPrimary.args = {};
