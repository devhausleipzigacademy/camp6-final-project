import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BookPreview } from "./BookPreview";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Book Share/Components/BookPreview",
	component: BookPreview,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof BookPreview>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BookPreview> = (args) => (
	<BookPreview {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
	linkHref: "",
};

export const Secondary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Secondary.args = {
	linkHref: "",
	imgSrc:
		"https://wp.en.aleteia.org/wp-content/uploads/sites/2/2017/05/web3-raphaels-school-of-athens-fresco-apostolic-palace-vatican-city-raphael-pd.jpg",
};

export const Tertiary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Tertiary.args = {
	linkHref: "",
	imgSrc:
		"https://marketplace.canva.com/EAD7WuSVrt0/1/0/1003w/canva-colorful-illustration-young-adult-book-cover-LVthABb24ik.jpg",
};

export const Fourth = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Fourth.args = {
	linkHref: "",
	imgSrc:
		"https://miblart.com/wp-content/uploads/2021/01/april-young-adult-768x1152.jpeg",
};

export const Fifth = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Fifth.args = {
	linkHref: "",
	imgSrc:
		"https://i.guim.co.uk/img/media/af1ea48f1eeaab4300691b35f585d326e6ed24bb/0_0_784_1200/master/784.jpg?width=700&quality=85&auto=format&fit=max&s=07b76b55b36cf2f0b56086c33d9e2763",
};

export const Sixth = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sixth.args = {
	linkHref: "",
	imgSrc:
		"https://kbimages1-a.akamaihd.net/f16e3461-030b-41c0-aed5-03e1a54c3dea/353/569/90/False/design-a-book-cover.jpg",
};
