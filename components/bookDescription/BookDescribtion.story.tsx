import React, { Children } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FaTelegram } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import BookDescription from "./BookDescription";

export function ExampleTags() {
	return (
		<>
			<p>stuff</p>
		</>
	);
}
export function ExampleGoogleButton() {
	return (
		<button>
			<div className="bg-slate-300 gap-1 p-6 items-center flex rounded-2xl ">
				<GrLocation />
				<p>open in maps</p>
			</div>
		</button>
	);
}
export function ExampleTelegramButton() {
	return (
		<button>
			<div className="bg-slate-300 flex gap-1 rounded-2xl items-center p-6">
				<FaTelegram />
				<p>message user</p>
			</div>
		</button>
	);
}

export default {
	title: "Book Review/Descripton",
	component: BookDescription,
	argTypes: {
		onClick: { action: "cliskc" },
	},
} as ComponentMeta<typeof BookDescription>;
const Template: ComponentStory<typeof BookDescription> = (args) => (
	<BookDescription {...args} />
);

export const ExampleBook = Template.bind({});

ExampleBook.args = {
	backButtonHandler: Function,
	likedButtonHandler: Function,
	title: "Sruviving Franz",
	author: "Furkan",
	description: "Franz is mean",
	image:
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.getap.com.tr%2Fwp-content%2Fuploads%2F2018%2F09%2Fkitap.jpg&f=1&nofb=1",
	children: [
		<ExampleTags />,
		<ExampleGoogleButton />,
		<ExampleTelegramButton />,
	],
};
