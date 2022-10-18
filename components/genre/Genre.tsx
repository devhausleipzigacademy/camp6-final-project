import { Book } from "@prisma/client";
import Carousel from "../carousel/Carousel";
import SubHeading2 from "../Subheading/Subheading";

interface GenreProps {
  genre: string;
  books: Book[];
}
export function Genre({ genre, books }: GenreProps) {
  return (
    <>
      <SubHeading2>{genre}</SubHeading2>
      <Carousel books={books} />
    </>
  );
}
