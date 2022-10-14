import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { initialState } from "./add.page";

export default function Suggestion() {
  let router = useRouter();
  const formState = router.query as typeof initialState;
  const { data, isLoading } = useQuery(["book", "suggestion"], () =>
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        formState.title
      )}+${encodeURIComponent(formState.author)}${
        formState.language ? `&langRestrict=${formState.language}` : ""
      }`
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const book = data.items[0].volumeInfo;

  return (
    <div className="flex flex-1 flex-col items-center gap-4 px-8 py-6">
      <h2 className="mb-4 text-center font-bold text-textGrey">
        Is this your book?
      </h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={book.imageLinks.thumbnail} className="h-64" alt={book.title} />
      <button className="bg-green p-3 text-white">yes, use this book</button>
      <button className="text-grey">no, show me more</button>
    </div>
  );
}
