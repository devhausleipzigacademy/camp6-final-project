import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { BookGrid } from "../components/bookGrid/BookGrid";
import checkQuery from "../utils/checkQuery";
import fetchBooks from "../utils/fetchBooks";

export default function previewGrid() {
  const query = useQuery<Book[]>(["getBooks"], () => fetchBooks({}));

  const previewGridContent = <BookGrid books={query.data} />;
  const queryCheck = checkQuery({
    queryStatus: query.status,
    queryItem: query.data,
    queryName: "books",
    successReturn: previewGridContent,
  });
  return queryCheck;
}
