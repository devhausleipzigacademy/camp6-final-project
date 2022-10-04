import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FaTelegram } from "react-icons/fa";

import { CustomButton } from "./Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Book Share/Components/Button",
    component: CustomButton,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof CustomButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomButton> = (args) => (
    <CustomButton {...args} />
);

export const Genre = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Genre.args = {
    functionality: "Genre",
    genreColorCode: 5,
    children: ["Fine Dining"],
};

export const ExternalApp = Template.bind({});
ExternalApp.args = {
    functionality: "ExternalApp",
    children: [<FaTelegram />, "message user"],
};

export const ConfirmationPrimary = Template.bind({});
ConfirmationPrimary.args = {
    functionality: "ConfirmationPrimary",
    children: ["Submit a book"],
};

export const ConfirmationSecondary = Template.bind({});
ConfirmationSecondary.args = {
    functionality: "ConfirmationSecondary",
    children: ["no, not this one"],
};

export const AddBook = Template.bind({});
AddBook.args = {
    functionality: "AddBook",
    children: ["This button does not work properly"],
};

export const LibraryMessage = Template.bind({});
LibraryMessage.args = {
    functionality: "LibraryMessage",
    children: ["This button does not work properly"],
};

export const LibraryReturned = Template.bind({});
LibraryReturned.args = {
    functionality: "LibraryReturned",
    children: ["This button does not work properly"],
};
