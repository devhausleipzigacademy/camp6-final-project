import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { VscChromeClose } from "react-icons/vsc";

import { BookGrid } from "../../components/bookGrid/BookGrid";
import { searchBooks } from "../../utils/fetchBooks";

export default function SearchResults() {
  const router = useRouter();
  const searchParams = router.query.searchParams as string;

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery<Book[]>(["books", "search"], () => searchBooks(searchParams));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <>
      <div className="sticky -top-4 z-10 border-b-0.75 border-grey bg-white pb-4">
        <button onClick={() => router.back()}>
          <VscChromeClose className="absolute mt-1 ml-7 h-6 w-6 stroke-0 text-textGrey" />
        </button>

        <h2 className="text-center font-arno text-2xl font-semibold text-dustyRose">
          Search Results
        </h2>
      </div>

      <BookGrid books={searchResults} />
    </>
  );
}
