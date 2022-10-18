import { Book } from "@prisma/client";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { BookPreview } from "../bookPreview/BookPreview";

interface CarouselProps {
  books: Book[];
}

export default function Carousel({ books }: CarouselProps) {
  if (!books || books.length === 0) {
    return (
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFgCFmiB0pQYHGDklq0EZX35hq-EuOP7N8Xg&usqp=CAU" />
    );
  } else {
    return (
      <div className="pb-4">
        <Splide
          hasTrack={false}
          aria-label="..."
          options={{
            perPage: 2,
            pagination: false,
            type: "slide",
            autoplay: true,
            interval: 3000,
            arrows: false,
          }}
        >
          <SplideTrack className="py-4">
            {books.map((book, index) => (
              <SplideSlide key={index}>
                <BookPreview
                  book={book}
                  isFaved={false}
                  bookSize={"carouselItem"}
                />
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </div>
    );
  }
}
