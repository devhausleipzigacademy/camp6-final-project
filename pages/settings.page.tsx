import { Combobox, RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ImRadioChecked2, ImRadioUnchecked } from "react-icons/im";
import { CustomButton } from "../components/button/Button";

export default function Settings(props) {
	const languages = [
		{ lang: "English - EN", selected: false },
		{ lang: "Deutsch - DE", selected: false },
		{ lang: "اَلْعَرَبِيَّةُ", selected: false },
	];
	const router = useRouter();
	const [language, setLangauge] = useState(null);
	const [selectedZipCode, setSelectedZipCode] = useState("04107");

	const [isActive, setIsActive] = useState(false);
	const [query, setQuery] = useState("04107");

	const zipCodes = [
		"24107",
		"04107",
		"04107",
		"02107",
		"14107",
		"94107",
		"04141",
		"04141",
		"04107",
		"14102",
		"24107",
		"04107",
		"04107",
		"02107",
		"04107",
		"14102",
		"24107",
		"04107",
		"04107",
		"02107",
		"04107",
		"14102",
	];

	const arr = [1123123];

	const filteredzipCodes =
		query === ""
			? zipCodes
			: zipCodes.filter((zip) => {
					return zip.toLowerCase().includes(query.toLowerCase());
			  });
	console.log(languages.filter((x) => x));
	return (
		<div className="ml-10 flex  flex-col  px-5">
			<p className="mt-10 mb-2 -ml-4  font-arnobold text-2xl  text-grey">
				Settings
			</p>
			<Combobox value={selectedZipCode} onChange={setSelectedZipCode}>
				<p className="mb-2 font-arnobold text-lg text-green">Location</p>
				<Combobox.Input
					className={
						"w-10/12 rounded-md border border-grey py-2 pl-2 text-lg text-grey outline-none"
					}
					onChange={(event) => setQuery(event.target.value)}
				/>

				<div className="relative">
					<Combobox.Options
						className={
							"text-customGrey  text-grey-blue absolute -my-2  flex max-h-40 w-10/12 flex-col gap-1 overflow-auto rounded-md border border-t-0 border-grey  bg-white pt-1 pb-1 pl-1  "
						}
					>
						{filteredzipCodes.map((zip) => (
							<Combobox.Option key={zip} value={zip}>
								{zip}
							</Combobox.Option>
						))}
					</Combobox.Options>
				</div>
			</Combobox>
			<div>
				<p className="mt-5 mb-1 font-arnobold text-xl text-green">Language</p>
				<RadioGroup
					value={language}
					onChange={setLangauge}
					className={
						"flex w-10/12 flex-col items-start rounded-b-md  rounded-tl-lg rounded-tr-lg border border-b-0 border-grey text-lg  "
					}
				>
					{languages.map(({ lang: langName, selected: bool }) => (
						<RadioGroup.Option
							as="a"
							key={langName}
							onClick={() => setIsActive((prev) => !prev)}
							value={langName}
							className={
								"flex w-full items-center gap-3   rounded-b-md border-b border-grey py-1 pl-2 text-start font-montserrat "
							}
						>
							{isActive ? (
								<ImRadioChecked2 className="text-green" />
							) : (
								<ImRadioUnchecked className="text-grey" />
							)}
							{langName}
						</RadioGroup.Option>
					))}
				</RadioGroup>
				<button className=" mt-7 font-arnobold text-lg text-green">
					Delete Account
				</button>
			</div>
			<div className="mt-12 flex flex-col self-center font-arno text-xl">
				<CustomButton functionality={"ConfirmationPrimary"} onClick={() => {}}>
					save changes
				</CustomButton>
				<button
					onClick={() => router.back()}
					className="mt-4 text-grey outline-none"
				>
					{" "}
					cancel
				</button>
			</div>
		</div>
	);
}
