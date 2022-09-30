import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { bookExamples } from "../bookGrid/BookGrid.story";

import Carousel from "./Carousel";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Carousel/Carousel",
  component: Carousel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Carousel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  books: bookExamples,
  category: "Category",
};

export const NoBooks = Template.bind({});
NoBooks.args = {};
