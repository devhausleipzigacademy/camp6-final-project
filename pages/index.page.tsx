import "@splidejs/react-splide/css";
import type { NextPage } from "next";
import { HomeSearchBar } from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import Header from "../components/Header/Header";
import Carousel from "../components/carousel/Carousel";
import { useBooks } from "../hooks/useBooks";

const Home: NextPage = (props) => {
  const { data: books, isLoading: booksLoading } = useBooks();

  if (booksLoading) return <p>Loading...</p>;

  if (!booksLoading && books === undefined) return <p>no books not found</p>;

  return (
    <>
      {/* <Header /> */}

      <body className="pl-6">
        {/* <HomeSearchBar /> */}

        <section id="carousel">
          <Carousel books={books} category="Recent Uploads" />
          <Carousel books={books} category="Cookboks" />
        </section>
      </body>
    </>
  );
};

export default Home;
