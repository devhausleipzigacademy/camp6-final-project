import { Combobox, RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { ImRadioChecked2, ImRadioUnchecked } from "react-icons/im";
import { CustomButton } from "../components/button/Button";

export default function Settings(props) {
	const languages = ["English - EN", "Deutsch - DE", "اَلْعَرَبِيَّةُ"];
	const router = useRouter();
	const [language, setLangauge] = useState(languages[0]);
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
			<Combobox value={undefined} onChange={setSelectedZipCode}>
				<p className="mb-2 font-arnobold text-lg text-green">Location</p>
				<Combobox.Input
					placeholder="04107"
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
			<RadioGroup value={language} onChange={setLangauge}>
				<p className={" mb-1 mt-5 font-arnobold text-lg  text-green "}>Languages</p>
				{languages.map((lang) => (
					/* Use the `active` state to conditionally style the active option. */
					/* Use the `checked` state to conditionally style the checked option. */
					<div className="w-10/12 border-t border-b border-grey">
						<RadioGroup.Option key={lang} value={lang} as={Fragment}>
							{({ active, checked }) => (
								<div className={`${active ? "  " : "  "}`}>
									<div className=" flex items-center gap-2 border-x border-grey p-1 font-montserrat ">
										{checked ? (
											<ImRadioChecked2 className="text-green" />
										) : (
											<ImRadioUnchecked className="text-grey" />
										)}
										{lang}
									</div>
								</div>
							)}
						</RadioGroup.Option>
					</div>
				))}
			</RadioGroup>
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
