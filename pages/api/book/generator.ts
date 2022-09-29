import exampleBooks100 from "../../../enums/100-books";
import genres from "../../../enums/genres";
import languages from "../../../enums/languages";
import { pickOne } from "../../../utils/random";

import { faker } from "@faker-js/faker";

export function generateFakeUser() {
	return {
		name: faker.name.fullName(),
		image: faker.image.avatar(),
		username: faker.word.noun(),
		telegramId: faker.random.alphaNumeric(12),
	};
}

export function generateFakeBook(
	ownerId?: string | undefined,
	carry: Record<string, string> = {}
) {
	const exampleBook = pickOne(exampleBooks100);

	return {
		ownerId: ownerId ? ownerId : undefined,
		title: exampleBook.title,
		author: exampleBook.author,
		language: pickOne(languages as unknown as string[]),
		image: faker.image.cats(),
		description: faker.lorem.paragraph(4),
		isbn: faker.datatype.uuid(),
		publishYear: faker.datatype.datetime(),
		genres: [
			pickOne(genres as unknown as string[]),
			pickOne(genres as unknown as string[]),
		],
		tags: [
			faker.word.adjective(),
			faker.word.adjective(),
			faker.word.adjective(),
		],
		isReserved: Boolean(Math.round(Math.random())),
	};
}
