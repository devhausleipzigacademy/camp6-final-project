// package imports
import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import "@splidejs/react-splide/css";

// local imports
import Carousel from "../components/carousel/Carousel";
import fetchBooks from "../utils/fetchBooks";
import { Book } from "@prisma/client";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import { useState } from "react";
import SubHeading2 from "../components/Subheading/Subheading";
import { Login } from "../components/Login";

export interface SearchParams {
  query: string;
  zipCode: string;
  languages: {
    English: boolean;
    German: Boolean;
    French: boolean;
  };
}

const initialSearchParams: SearchParams = {
  query: "",
  zipCode: "",
  languages: {
    English: false,
    German: false,
    French: false,
  },
};

const Home: NextPage = (props) => {
  const [searchParams, setSearchParams] = useState(initialSearchParams);
  const genres = ["Cookbook", "Fiction"];
  const isLoggedIn = false;

  //   const categoryData = Object.fromEntries(
  //     genres.map((genre) => [
  //       genre,
  //       useQuery<Book[]>(["books", genre], () =>
  //         fetchBooks({
  //           orderBy: "createdAt",
  //           isAvailable: true,
  //           genre,
  //         })
  //       ),
  //     ])
  //   );

  // const recentUploadsQuery = useQuery<Book[]>(["getBooks", "createdAt"], () =>
  //   fetchBooks({ orderBy: "createdAt", isAvailable: true })
  // );

  //   console.log(recentUploadsQuery.isError, recentUploadsQuery.data);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <>
      <HomeSearchBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="pl-6">
        <section id="carousel">
          <div key="0">
            <SubHeading2>Recent Uploads</SubHeading2>
            {recentUploadsQuery.isError ? (
              <p>Something went wrong...</p>
            ) : recentUploadsQuery.isLoading ? (
              <p>Loading...</p>
            ) : (
              //   <Carousel books={recentUploadsQuery.data} />
              <Carousel books={[]} />
            )}
          </div>
          {Object.entries(categoryData).map(([category, query], index) => {
            return (
              <div key={index + 1}>
                <SubHeading2>{category}</SubHeading2>
                {query.isError ? (
                  <p>Something went wrong...</p>
                ) : query.isLoading ? (
                  <p>Loading...</p>
                ) : (
                  // <Carousel books={query.data} />
                  <Carousel books={[]} />
                )}
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default Home;
