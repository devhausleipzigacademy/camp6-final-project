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

  const categoryData = Object.fromEntries(
    genres.map((genre) => [
      genre,
      useQuery<Book[]>(["books", genre], () =>
        fetchBooks({
          orderBy: "createdAt",
          isAvailable: true,
          genre,
        })
      ),
    ])
  );

  const recentUploadsQuery = useQuery<Book[]>(["getBooks", "createdAt"], () =>
    fetchBooks({ orderBy: "createdAt", isAvailable: true })
  );

  console.log(recentUploadsQuery.isError, recentUploadsQuery.data);

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
              <Carousel books={recentUploadsQuery.data} />
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
                  <Carousel books={query.data} />
                )}
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
  // =======
  //   const categories = ["Cookbooks", "Fantasy"];

  //   const categoryData = Object.fromEntries(
  //     categories.map((category) => [
  //       category,
  //       useQuery<Book[]>(["getBooks", category], () => fetchBooks({ category })),
  //     ])
  //   );

  //   const recentUploadsQuery = useQuery<Book[]>(["getBooks", "createdAt"], () =>
  //     fetchBooks({ orderBy: "createdAt" })
  //   );

  //   return (
  //     <>
  //       {/* <Header /> */}

  //       <div className="pl-6">
  //         <h1>Home</h1>
  //         {/* <HomeSearchBar /> */}

  //         <section id="carousel">
  //           <div key="0">
  //             <SubHeading2>Recent Uploads</SubHeading2>
  //             {recentUploadsQuery.isLoading ? (
  //               <p>Loading...</p>
  //             ) : (
  //               <Carousel books={recentUploadsQuery.data} />
  //             )}
  //           </div>
  //           {Object.entries(categoryData).map(([category, query], index) => {
  //             return (
  //               <div key={index + 1}>
  //                 <SubHeading2>{category}</SubHeading2>
  //                 {query.isLoading ? (
  //                   <p>Loading...</p>
  //                 ) : (
  //                   <Carousel books={query.data} />
  //                 )}
  //               </div>
  //             );
  //           })}
  //         </section>
  //       </div>
  //     </>
  //   );
  // >>>>>>> Stashed changes
};

export default Home;
