import { Combobox } from "@headlessui/react";
import { useState } from "react";

const list = [
	"furdddkan",
	"ahmet",
	"mehmet",
	"necdet",
	"stuff",
	"aslan",
	"kaplan",
];
function Placeholder() {
	const [query, setQuery] = useState("");
	const filter =
		query === ""
			? list
			: list.filter((person) => {
					console.log(person);
					return person.includes(query.toLowerCase());
			  });

	console.log(filter);

	return (
		<div>
			<form action="" method="post">
				<Combobox defaultValue={list[0]}>
					<Combobox.Input onChange={(event) => setQuery(event.target.value)} />
					<Combobox.Options>
						{filter.map((x, index) => (
							<Combobox.Option key={index} value={x}>
								{x}
							</Combobox.Option>
						))}
					</Combobox.Options>
				</Combobox>
				<button>Submit</button>
			</form>
		</div>
	);
}

export default Placeholder;
