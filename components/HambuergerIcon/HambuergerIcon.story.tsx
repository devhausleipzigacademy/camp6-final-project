import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HamburgerIcon } from "./HambuergerIcon";

export default {
    title: "HamburgerMenu/Icon",
    component: HamburgerIcon,
    argsTypes: {
        onClick: "click",
    },
} as ComponentMeta<typeof HamburgerIcon>;

const Template: ComponentStory<typeof HamburgerIcon> = (args) => (
    <HamburgerIcon {...args} />
);

export const HamburgerButton = Template.bind({});

HamburgerButton.args = {
    size: "h-7 w-7",
};
