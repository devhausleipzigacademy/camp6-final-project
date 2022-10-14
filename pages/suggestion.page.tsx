import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { isTemplateSpan } from "typescript";
import languages from "../enums/languages";
import { BooksResponse } from "../utils/apiTypes";
import { initialState } from "./add.page";

export default function Suggestion() {
  let router = useRouter();
  let [counter, setCounter] = useState(0);
  const formState = router.query as typeof initialState;
  console.log(formState);
  const { data, isLoading } = useQuery<BooksResponse>(
    ["book", "suggestion"],
    () =>
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          formState.title
        )}+${encodeURIComponent(formState.author)}${
          formState.language ? `&langRestrict=${formState.language}` : ""
        }`
      )
        .then((res) => res.json())
        .then((res) => {
          const items = res.items
            .filter(
              (book) =>
                book.volumeInfo && book.volumeInfo?.imageLinks?.thumbnail
            )
            .map((book) => book.volumeInfo);
          return {
            items,
            count: items.length,
          };
        })
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(data.count);
  const book = data.items[counter];

  async function submitBook() {
    const userInfo = JSON.parse(localStorage.getItem("c6-tid"));
    fetch("http://bookshare.local/api/book", {
      method: "POST",
      body: JSON.stringify({
        title: book.title,
        author: book.authors[0] || "",
        genres: book.categories || [],
        description: book.description,
        isbn: book.industryIdentifiers[0].identifier,
        language: book.language,
        image: book.imageLinks.thumbnail,
        publishYear: new Date(book.publishedDate).getFullYear,
        tags: [],
        ownerId: userInfo.uid,
      }),
    })
      .then((res) => res.json())
      .then(() => router.replace("/"));
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-4 px-8 py-6">
      <h2 className="mb-4 text-center font-bold text-textGrey">
        Is this your book?
      </h2>
      {book.imageLinks?.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.imageLinks.thumbnail}
          className="h-64"
          alt={book.title}
        />
      ) : (
        <p>{book.title}</p>
      )}
      <button onClick={submitBook} className="bg-green p-3 text-white">
        yes, use this book
      </button>
      {counter < data.count - 1 && (
        <button onClick={() => setCounter(counter + 1)} className="text-grey">
          no, show me more
        </button>
      )}
    </div>
  );
}
