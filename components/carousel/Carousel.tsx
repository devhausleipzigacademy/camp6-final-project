import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Book } from "@prisma/client";
import { BookPreview } from "../bookPreview/BookPreview";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

interface CarouselProps {
  books: Book[];
  category: string;
}

export default function Carousel({ books, category }: CarouselProps) {
  if (!books || books.length === 0) {
    return (
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFgCFmiB0pQYHGDklq0EZX35hq-EuOP7N8Xg&usqp=CAU" />
    );
  } else
    return (
      <>
        <h2 className="font-arnoPro text-2xl font-bold text-brown">
          {category}
        </h2>
        <Splide
          hasTrack={false}
          aria-label="..."
          options={{
            perPage: 3,
            perMove: 1,
            focus: 0,
            gap: "100px",
            pagination: false,
            trimSpace: false,
            type: "loop",
          }}
        >
          <SplideTrack className="py-4">
            {books.map((book) => (
              <SplideSlide>
                <BookPreview
                  imgSrc={book.image}
                  bookTitle={book.title}
                  bookAuthor={book.author}
                  linkHref={`/book/${book.identifier}`}
                  bookSize={"homepage"}
                />
              </SplideSlide>
            ))}
          </SplideTrack>

          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev">
              <BiChevronRight className="h-full w-full " />
            </button>
            <button className="splide__arrow splide__arrow--next">
              <BiChevronRight className="h-full w-full" />
            </button>
          </div>
        </Splide>
        <div className=" pb-8 " />
      </>
    );
}
