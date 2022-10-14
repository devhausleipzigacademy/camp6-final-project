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

const Home: NextPage = (props) => {
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

  const indexPageContent = (
    <>
      <HomeSearchBar />
      <div className="pl-6">
        <section id="carousel">
          <div key="0">
            <SubHeading2>Recent Uploads</SubHeading2>
            <Carousel books={recentUploadsQuery.data} />
          </div>
          {Object.entries(categoryData).map(([category, query], index) => {
            return (
              <div key={index + 1}>
                <SubHeading2>{category}</SubHeading2>

                <Carousel books={query.data} />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );

  const queryCheck = checkQuery({
    queryStatus: recentUploadsQuery.status,
    queryItem: recentUploadsQuery.data,
    queryName: "books",
    successReturn: indexPageContent,
  });
  return queryCheck;
};

export default Home;
