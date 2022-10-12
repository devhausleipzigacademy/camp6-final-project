// package imports
import { useState } from "react";

// local imports
import { CustomButton } from "../../components/button/Button";
import { LanguageSearchBar } from "../../components/SearchBars/LanguageSearchBar";
import { PostBook } from "../../pages/api/book/model.zod";

export const InitialInput: PostBook = {
	title: "",
	author: "",
	language: "",
};

interface InputFormProps {
	formType: "create" | "update";
}

export default function InputForm({ formType }: InputFormProps) {
	const [userInput, SetUserInput] = useState<PostBook>(InitialInput);
	const [showMore, setShowMore] = useState(false);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (formType === "create") {
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

				<LanguageSearchBar />

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
