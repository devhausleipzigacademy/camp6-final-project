// package imports
import "@splidejs/react-splide/css";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";

// local imports
import { Book } from "@prisma/client";
import { useState } from "react";
import Carousel from "../components/carousel/Carousel";
import { Genre } from "../components/genre/Genre";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import SubHeading2 from "../components/Subheading/Subheading";
import fetchBooks from "../utils/fetchBooks";

const Home: NextPage = () => {
  const [genres, setGenres] = useState<string[]>([]);

  const { data, isLoading, isError } = useQuery<Book[]>(
    ["getBooks", "createdAt"],
    () => fetchBooks({ orderBy: "createdAt", isAvailable: true }),
    {
      onSuccess: (books) => {
        const generatedGenres = Array.from(
          new Set(books.map((book) => book.genres).flat())
        );
        setGenres(generatedGenres as string[]);
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <>
      <HomeSearchBar />
      <div className="pl-6">
        <section id="carousel">
          <div>
            <SubHeading2>Recent Uploads</SubHeading2>
            <Carousel books={data} />
          </div>
          {genres.map((genre) => (
            <Genre
              key={genre}
              genre={genre}
              books={data.filter((book) => {
                const genres = book.genres as string[];
                return genres.includes(genre);
              })}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;
