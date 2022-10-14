// package imports
import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import "@splidejs/react-splide/css";

// local imports
import Carousel from "../components/carousel/Carousel";
import fetchBooks from "../utils/fetchBooks";
import { Book } from "@prisma/client";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import SubHeading2 from "../components/Subheading/Subheading";
import checkQuery from "../utils/checkQuery";
import { useEffect, useState } from "react";

const Home: NextPage = (props) => {
  const [genres, setGenres] = useState<string[]>([]);
  useEffect(() => {
    fetch("http://bookshare.local/api/book")
      .then((res) => res.json())
      .then((res) => Array.from(new Set(res.map((book) => book.genres).flat())))
      .then((res) => setGenres(res as string[]));
  }, []);

  // const categoryData = Object.fromEntries(
  //   genres.map((genre) => [
  //     genre,
  //     useQuery<Book[]>(["books", genre], () =>
  //       fetchBooks({
  //         orderBy: "createdAt",
  //         isAvailable: true,
  //         genre,
  //       })
  //     ),
  //   ])
  // );

  const { data, isLoading } = useQuery<Book[]>(
    ["getBooks", "createdAt"],
    // () => fetch("http://bookshare.local/api/book").then((res) => res.json())
    () => fetchBooks({ orderBy: "createdAt", isAvailable: true })
  );

  const indexPageContent = (
    <>
      <HomeSearchBar />
      <div className="pl-6">
        <section id="carousel">
          <div key="0">
            <SubHeading2>Recent Uploads</SubHeading2>
            <Carousel books={data} />
          </div>
          {genres.map((genre) => (
            <Genre key={genre} genre={genre} />
          ))}
          {/* {Object.entries(categoryData).map(([category, query], index) => {
            return (
              <div key={index + 1}>
                <SubHeading2>{category}</SubHeading2>

                <Carousel books={query.data} />
              </div>
            );
          })} */}
        </section>
      </div>
    </>
  );

  // const queryCheck = checkQuery({
  //   queryStatus: recentUploadsQuery.status,
  //   queryItem: recentUploadsQuery.data,
  //   queryName: "books",
  //   successReturn: indexPageContent,
  // });
  // return queryCheck;
  return indexPageContent;
};

export default Home;

interface GenreProps {
  genre: string;
}
function Genre({ genre }: GenreProps) {
  const { data, isLoading } = useQuery<Book[]>(["books", genre], () =>
    // fetch(`http://bookshare.local/api/book?genre=${genre}`).then((res) =>
    //   res.json()
    // )
    fetchBooks({
      orderBy: "createdAt",
      isAvailable: true,
      genre,
    })
  );
  console.log(data);
  return (
    <>
      <SubHeading2>{genre}</SubHeading2>
      <Carousel books={data} />
    </>
  );
}
