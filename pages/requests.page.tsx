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
import checkQuery from "../utils/checkQuery";

// renders out the list of borrow requests
export default function Requests() {
  const { data: requests, status: status } = useQuery<
    (Request & {
      book: Book;
      requester: User;
    })[]
  >(["requests"], () => fetchRequests({}));

  const queryCheck = checkQuery({
    queryStatus: status,
    queryItem: requests,
    queryName: "requests",
    successReturn: requestPageContent(requests),
  });
  return queryCheck;
}

function requestPageContent(requests) {
  if (requests !== undefined && requests !== null)
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
  bookId: string;
}

function RequestItem({
  book,
  request,
  requesterName,
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
          {requesterName} requested to borrow{" "}
          <Link href={`/book/${bookId}`}>
            <a className=" text-black underline ">{book.title}</a>
          </Link>
        </p>
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
              /* TODO: create telegram bot action that notifies user about request acceptance*/
            }
            borrowBook({
              bookId: book.identifier,
              book: {
                borrowerId: request.requesterId,
                borrowDate: new Date(),
              },
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
