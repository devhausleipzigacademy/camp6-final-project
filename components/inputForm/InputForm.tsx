// package imports
import { Combobox } from "@headlessui/react";
import { Book } from "@prisma/client";
import { useEffect } from "@storybook/addons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// local imports
import { CustomButton } from "../../components/button/Button";
import { retrieveBook } from "../../pages/api/book/interaction";
import { PostBook } from "../../pages/api/book/model.zod";
import fetchBook from "../../utils/fetchBook";
import languagePicker, {
	languageList,
	LanguageListItem,
} from "../../utils/languagePicker";
import { createBook } from "../../utils/updateBook";

export const InitialInput: PostBook = {
	title: "",
	author: "",
	language: "",
	genres: [],
	tags: [],
	isbn: "",
	image: "",
	description: "",
};

interface InputFormProps {
	formType: "create" | "update";
	ownerId: string;
	oldBookData?: Book;
}

export default function InputForm({
	formType,
	ownerId,
	oldBookData,
}: InputFormProps) {
	const queryClient = useQueryClient();

	const [userInput, SetUserInput] = useState<PostBook>(InitialInput);
	const [showMore, setShowMore] = useState(false);
	// two useStates for the Language Combobox
	const [selectedLanguage, setSelectedLanguage] = useState({
		code: "",
		name: "",
	});
	const [query, setQuery] = useState("");

	if (oldBookData) {
		const { data: book, status } = useQuery<Book>(
			["getBook", oldBookData.identifier],
			() => fetchBook(String(oldBookData.identifier)),
			{
				enabled: oldBookData.identifier.length > 0,
				onSuccess: () => {
					SetUserInput({ ...book });
					const language = languagePicker([
						{ _count: 0, language: oldBookData.language },
					]);
					setSelectedLanguage(language[0]);
				},
			}
		);
	}
	console.log(userInput);

	const createNewBook = useMutation(createBook, {
		onSuccess: () => {
			queryClient.invalidateQueries(["books"]);
		},
	});

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const language = selectedLanguage.code;

		if (formType === "create") {
			createNewBook.mutate({
				...userInput,
				language: language,
				ownerId: ownerId,
			});
		}
	}

	// TODO: register language input in userinput useState

	let moreInputOptions;

	if (showMore) {
		moreInputOptions = (
			<>
				<label htmlFor="isbn">ISBN</label>

				<input
					type="text"
					name="isbn"
					className="inputField"
					value={userInput.isbn}
					onChange={(event) =>
						SetUserInput({ ...userInput, isbn: event.target.value })
					}
				/>

				<label htmlFor="image">Image</label>

				<input
					type="text"
					name="image"
					className="inputField"
					value={userInput.image}
					onChange={(event) =>
						SetUserInput({ ...userInput, image: event.target.value })
					}
				/>
				<label htmlFor="description">Desription</label>

				<input
					type="text"
					name="description"
					className="inputField"
					value={userInput.description}
					onChange={(event) =>
						SetUserInput({ ...userInput, description: event.target.value })
					}
				/>

				{/* <label htmlFor="genres">genres</label>

				<input
					type="text"
					name="genres"
					
					className="inputField"
					value={userInput.genres}
					onChange={(event) => 
						SetUserInput({ ...userInput, genres: [event.target.value] })
					}
				/> */}

				{/* <label htmlFor="publishYear">Year of Publication</label>

				<input
					type="text"
					name="publishYear"
					
					className="inputField"
					value={userInput.publishYear}
					onChange={(event) => 
						SetUserInput({ ...userInput, publishYear: event.target.value })
					}
				/>*/}
			</>
		);
	}

	// // // // // //
	// // For the language picker combo box
	// // // // // //

	const filteredLanguages =
		query === ""
			? languageList
			: languageList.filter((language) => {
					return language.name.toLowerCase().includes(query.toLowerCase());
			  });

	// // // // // //

	if (!showMore) moreInputOptions = <></>;

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="m-10 flex flex-col px-4 font-arnobold font-medium text-grey "
			>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					required
					className="inputField"
					value={userInput.title}
					onChange={(event) =>
						SetUserInput({ ...userInput, title: event.target.value })
					}
				/>
				<label htmlFor="author">Author</label>
				<input
					type="text"
					name="author"
					required
					className="inputField"
					value={userInput.author}
					onChange={(event) =>
						SetUserInput({ ...userInput, author: event.target.value })
					}
				/>
				<label htmlFor="language">Language</label>
				{/* LanguageSearchBar */}
				<Combobox value={selectedLanguage} onChange={setSelectedLanguage}>
					<Combobox.Input
						className={"inputField"}
						onChange={(event) => setQuery(event.target.value)}
						displayValue={(language: LanguageListItem) => language.name}
					/>
					<Combobox.Options
						className="border border-dotted border-grey"
						placeholder="select a language"
					>
						{filteredLanguages.map((language) => (
							<Combobox.Option
								key={language.code}
								value={language}
								className="cursor-pointer text-sm text-textBlack"
								placeholder="select a language"
							>
								{language.name}
							</Combobox.Option>
						))}
					</Combobox.Options>
				</Combobox>
				{moreInputOptions}
				<button
					onClick={() => {
						setShowMore(!showMore);
					}}
					className="text-end font-montserrat text-xs font-thin text-grey underline"
				>
					{showMore ? <span>show less</span> : <span>additional info</span>}
				</button>
				<div className="mt-10 self-center">
					<CustomButton functionality="ConfirmationPrimary" onClick={() => {}}>
						Submit Book
					</CustomButton>
				</div>
			</form>
		</>
	);
}
