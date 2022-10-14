import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { BookGrid } from "../components/bookGrid/BookGrid";
import fetchBooks from "../utils/fetchBooks";

export default function previewGrid() {
  const query = useQuery<Book[]>(["getBooks"], () => fetchBooks({}));

  return (
    <>{query.isLoading ? <p>Loading...</p> : <BookGrid books={query.data} />}</>
  );
}
