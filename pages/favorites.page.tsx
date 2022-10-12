// package imports
import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

// local imports
import { BookGrid } from "../components/bookGrid/BookGrid";
import { fetchLikedBooks } from "../utils/fetchUser";

// TODO:
// - show all books that are liked by the current user (likedBy = user identifier of user curerntly logged in)
// - use bookGrid component?

export default function Favorites() {
  const { data: likedBooks, status } = useQuery<Book[]>(
    ["books"],
    () => fetchLikedBooks("302de339-cfb8-4d2e-97f2-0e5dc351c2a2") // TODO: ask Dan how to fetch userIds
  );

  return (
    <>
      <h2 className="pageTitle">Favorites</h2>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <p> An error has occured. </p>
      ) : (
        <BookGrid books={likedBooks} />
      )}
    </>
  );
}
