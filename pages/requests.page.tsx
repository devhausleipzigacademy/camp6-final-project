// package imports
import Link from "next/link";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// local imports
import { Book, Request, User } from "@prisma/client";
import { BookPreview } from "../components/bookPreview/BookPreview";
import { fetchRequests } from "../utils/fetchRequests";
import { useDeleteRequest, useDeleteRequests } from "../utils/fetchRequest";
import { updateBook } from "../utils/updateBook";

// TODO:
// 1. filter for books that have a request on them, belong to a specific user and are available
// 2. when the user accepts a request, the respective book is set to unavailable and the request gets removed
// 3. when the user denies a request, the respective book stays available and the request gets removed

// renders out the list of borrow requests
export default function Library() {
  const { data: requests, status: status } = useQuery<
    (Request & {
      book: Book;
      requester: User;
    })[]
  >(["requests"], () => fetchRequests({}));

  if (status === "loading") return <p>Loading...</p>;

  if (status === "error") return <p>No requests found.</p>;

  if (requests.length === 0)
    return (
      <p className=" flex justify-center pt-16 font-montserrat text-base text-black">
        You have no open requests.
      </p>
    );

  // TODO: abstract status notification as util function

  return (
    <>
      <h2 className="pageTitle">Requests</h2>

      {requests.map((request) => (
        <div className="flex flex-col justify-evenly border-b-0.75 border-grey p-5">
          <RequestItem
            key={request.identifier}
            book={request.book}
            request={request}
            requesterName={request.requester.name}
            requesterUserName={request.requester.username}
            bookId={request.bookId}
          />
        </div>
      ))}
    </>
  );
}

// individual borrow request
interface RequestItemProps {
  book: Book;
  key: string;
  request: Request;
  requesterName: string;
  requesterUserName: string;
  bookId: string;
}

function RequestItem({
  book,
  request,
  requesterName,
  requesterUserName,
  bookId,
}: RequestItemProps) {
  const { mutate: declineRequest } = useDeleteRequest(request.identifier);
  const { mutate: declineRequests } = useDeleteRequests(bookId);
  const queryClient = useQueryClient();
  const { mutate: borrowBook } = useMutation(updateBook, {
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },
  });

  return (
    <div className="flex justify-evenly">
      <BookPreview
        bookTitle={book.title}
        bookAuthor={book.author}
        imgSrc={book.image}
        linkHref={`/book/${book.identifier}`}
        bookSize={"listItemSmall"}
        isAvailable={book.isAvailable}
      />

      <div className="flex flex-col justify-center p-4 px-5">
        <p className="font-arnobold text-sm text-black">
          {requesterName} requested to borrow {/* TODO: add book link */}
        </p>
        <Link href={`/book/${bookId}`}>
          <a className=" text-black underline ">{book.title}</a>
        </Link>
        @{requesterUserName}
      </div>

      <div className="relative flex items-center gap-3">
        <button // deny request
          onClick={() => declineRequest()}
        >
          <FiXCircle className="text-brown" size={30} />
        </button>
        <button // accept request
          onClick={() => {
            {
              /* TODO: decide what happens to other requests for the same book; 
              create telegram bot action that notifies user about request acceptance*/
            }
            borrowBook({
              bookId: book.identifier,
              book: { borrowerId: request.requesterId },
            });
            declineRequests();
          }}
        >
          <FiCheckCircle className="text-green" size={30} />
        </button>
      </div>
    </div>
  );
}
