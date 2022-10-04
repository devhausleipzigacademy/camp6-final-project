import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { BookGrid } from "../components/bookGrid/BookGrid";
import fetchBooks from "../utils/fetchBooks";

export default function Favorites() {
  const query = useQuery<Book[]>(["getBooks"], () => fetchBooks({}));

  return (
    <>
      <h2 className="font-arnoPro border-b border-grey pb-4 pt-7 text-center text-2xl font-bold text-dustyRose">
        Favorites
      </h2>
      {query.isLoading ? <p>Loading...</p> : <BookGrid books={query.data} />}
    </>
  );
}
