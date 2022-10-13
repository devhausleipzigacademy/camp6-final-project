// package imports
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// local imports
import { Book } from "@prisma/client";
import { BookPreview } from "../components/bookPreview/BookPreview";
import fetchBooks from "../utils/fetchBooks";
import { ToggleSwitch } from "../components/toggleSwitch/ToggleSwitch";
import { CustomButton } from "../components/button/Button";
import { updateBook } from "../utils/updateBook";
import checkQuery from "../utils/checkQuery";

export default function Library() {
  const { data: books, status: booksStatus } = useQuery<Book[]>(["books"], () =>
    fetchBooks({ orderBy: "title" })
  );

  console.log(books);

  const queryCheck = checkQuery({
    queryStatus: booksStatus,
    queryItem: books,
    queryName: "books",
    successReturn: libraryPageContent(books),
  });
  return queryCheck;
}

function libraryPageContent(books) {
  if (books !== undefined)
    return (
      <>
        <div className="fixed top-[88vh] right-4">
          <CustomButton
            functionality={"AddBook"}
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          ></CustomButton>
        </div>
        <h2 className="pageTitle">
          Library
          <Link href="/loans">
            <a className="pl-12 text-grey">Loans at a Glance</a>
          </Link>
        </h2>
        {books.map((book) => (
          <LibraryItem key={book.identifier} book={book} />
        ))}
      </>
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

  return (
    <div className="flex cursor-pointer justify-evenly border-b-0.75 border-grey p-5">
      <BookPreview
        isAvailable={book.isAvailable}
        bookTitle={book.title}
        bookAuthor={book.author}
        imgSrc={book.image}
        linkHref={`/book/${book.identifier}`}
        bookSize={"listItemSmall"}
      />
      <Link href={`/book/${book.identifier}`}>
        <a className="ml-7 flex w-full flex-col justify-center font-montserrat text-sm font-normal text-textBlack">
          <p>{book.author}</p>
          <p>{book.title}</p>
        </a>
      </Link>
      <div className="flex items-center gap-3">
        {/* TODO: add functionality to Edit Button */}
        {/* <FiEdit className="text-brown" /> */}

        <ToggleSwitch
          value={book.isAvailable}
          toggleHandler={() =>
            mutation.mutate({
              bookId: book.identifier,
              book: { isAvailable: !book.isAvailable },
            })
          }
        ></ToggleSwitch>
      </div>
    </div>
  );
}
