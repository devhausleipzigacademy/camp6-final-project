import Image from "next/future/image";
import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiChevronLeft } from "react-icons/hi";
import { ExampleTags } from "../components/bookDescription/BookDescribtion.story";
import { Button } from "../components/button/Button";
import Thraxas from "../public/testingImages/thraxas_and_the_dance_of_death.jpg";
import languagesJSON from "../enums/ISO-languages.json";

// const obj = Object.entries(languagesJSON).map(([key, value]) => ({
//   code: key,
//   name: value[0],
// }));

export default function BookDescription() {
  // console.log(obj);
  const router = useRouter();
  const book = {
    title: "The title",
    author: "The Author",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi alias, similique laudantium mollitia tenetur aliquam dolores dolore hic ullam quas.",
    image: Thraxas,
    backgroundColor: "#fef1e0",
  };

  return (
    <div className="flex w-mobile flex-col items-stretch py-5 px-10">
      <div
        style={{ background: book.backgroundColor }}
        className="relative my-5 h-fit  rounded-3xl bg-[#fef1e0] px-36 py-20 "
      >
        <div>
          <button
            onClick={() => router.back()}
            className="absolute  left-1 top-4"
          >
            <HiChevronLeft className="h-10 w-10" />
          </button>
          <button
            onClick={() => {
              console.log("favorite");
            }}
            className="absolute top-4 right-3"
          >
            <AiOutlineHeart className="h-8 w-8" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <Image className="rounded-xl " src={book.image} alt={book.title} />
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{book.title}</p>
            <p className="text-lg text-slate-500">by {book.author}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col pl-2">
        <div className=" border-l-2 pl-2">
          <p className="mb-2 text-xl font-bold">Description</p>
          <p className="text-gray-400">{book.description}</p>
        </div>
        <ExampleTags />
      </div>
      <div className="my-10 flex justify-center gap-7">
        <Button onClick={() => {}} functionality="External">
          <FaTelegram />
          Message user
        </Button>
        <Button onClick={() => {}} functionality="External">
          <GoLocation className="text-white" />
          Open in maps
        </Button>
      </div>
    </div>
  );
}
