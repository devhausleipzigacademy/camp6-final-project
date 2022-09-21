import { pickOne } from "../../../utils/random";
import exampleBooks100 from "../../../enums/100-books";
import languages from "../../../enums/languages";
import genres from "../../../enums/genres";

import { faker } from "@faker-js/faker";

export function generateBook(
    ownerId: string | undefined,
    carry: Record<string, string> = {}
) {
    if (!ownerId) {
        ownerId = faker.datatype.uuid();
    }

    const exampleBook = pickOne(exampleBooks100);

    return {
        title: exampleBook.title,
        author: exampleBook.author,
        language: pickOne(languages as unknown as string[]),
        ownerId: ownerId,
        image: faker.image.cats(),
        description: faker.lorem.paragraph(4),
        isbn: faker.datatype.uuid(),
        publishYear: exampleBook.year,
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
