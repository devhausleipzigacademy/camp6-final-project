import { Book } from "@prisma/client";

const tagColors = [
  "bg-blue",
  "bg-dustyRose",
  "bg-salmon",
  "bg-yellow",
  "bg-green",
  "bg-linen",
];

interface Props {
  book: Book;
}

export function Tags({ book }: Props) {
  const genres = book.genres as string[];
  return (
    <div className="flex gap-2">
      {genres.map((genre, index) => (
        <p
          key={genre}
          className={`${
            tagColors[index % tagColors.length]
          } w-fit rounded-lg   px-2  py-1 text-black`}
        >
          {genre}
        </p>
      ))}
    </div>
  );
}
