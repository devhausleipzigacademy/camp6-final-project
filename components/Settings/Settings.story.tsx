import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Settings } from "./Settings";

export default {
	title: "SettingsPage/Component",
	component: Settings,
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = (args) => <Settings />;

export const Settingss = Template.bind({});
