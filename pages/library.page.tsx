import { Book } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import router from "next/router";
import { FiEdit } from "react-icons/fi";

import { BookPreview } from "../components/bookPreview/BookPreview";
import { CustomButton } from "../components/button/Button";
import { ToggleSwitch } from "../components/toggleSwitch/ToggleSwitch";
import fetchBooks from "../utils/fetchBooks";
import { updateBook } from "../utils/updateBook";

export default function Library() {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery<Book[]>(["books"], () => fetchBooks({ orderBy: "title" }));

  if (isLoading)
    return (
      <p className="mt-10 flex justify-center font-montserrat text-base text-textGrey">
        Loading...
      </p>
    );

  if (isError)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFgCFmiB0pQYHGDklq0EZX35hq-EuOP7N8Xg&usqp=CAU"
          alt="error image"
        />
        <p className="mt-10 flex justify-center font-montserrat text-base text-textGrey">
          Something went wrong. Please try again later.
        </p>
      </div>
    );

  // if (books === undefined)
  //   return (
  //     <p className="mt-10 flex justify-center font-montserrat text-base text-textGrey">
  //       Something went wrong. Please try again later.
  //     </p>
  //   );

  return (
    <div className="pb-20">
      <div className="fixed top-[88vh] right-4 z-10">
        <CustomButton
          functionality={"AddBook"}
          onClick={() => router.push("/addbook")}
        ></CustomButton>
      </div>
      <h2 className="pageTitle">
        Library
        <Link href="/loans">
          <a className="pl-12 text-grey">Loans at a Glance</a>
        </Link>
      </h2>
      {!books.length ? (
        <p className="mt-10 flex justify-center font-montserrat text-base text-textGrey">
          No books found.
        </p>
      ) : (
        books
          .sort((a, b) => (a.title > b.title ? 1 : -1))
          .map((book) => <LibraryItem key={book.identifier} book={book} />)
      )}
    </div>
  );
}
interface LibraryItemProps {
  key: string;
  book: Book;
}

function LibraryItem({ book }: LibraryItemProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation(updateBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },
  });

  const bookUrl = book.title.replaceAll(" ", "-");

  return (
    <div className="flex cursor-pointer justify-evenly border-b-0.75 border-grey p-5">
      <BookPreview
        // TODO: fix isFaved input
        book={book}
        isFaved={false}
        bookSize={"listItemSmall"}
      />
      <Link href={`/book/${book.identifier}`}>
        <a className="ml-7 flex w-full flex-col justify-center font-montserrat text-sm font-normal text-textBlack">
          <p>{book.author}</p>
          <p>{book.title}</p>
        </a>
      </Link>
      <div className="flex items-center gap-3">
        <button onClick={() => router.push(`/book/${book.identifier}/edit`)}>
          <FiEdit className="text-brown" />
        </button>

        <ToggleSwitch
          value={book.isAvailable}
          id={book.identifier}
          toggleHandler={() => {
            console.log(book.identifier);
            mutation.mutate({
              bookId: book.identifier,
              book: { isAvailable: !book.isAvailable },
            });
          }}
        ></ToggleSwitch>
      </div>
    </div>
  );
}
