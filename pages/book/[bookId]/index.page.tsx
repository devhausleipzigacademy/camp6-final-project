import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiChevronLeft } from "react-icons/hi";
import { ExampleTags } from "../../../components/bookDescription/BookDescription.story";
import { CustomButton } from "../../../components/button/Button";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@prisma/client";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import fetchBook from "../../../utils/fetchBook";
import checkQuery from "../../../utils/checkQuery";
import { InferGetStaticPropsType } from "next/types";

const tagColors = [
  "bg-blue",
  "bg-dustyRose",
  "bg-salmon",
  "bg-yellow",
  "bg-green",
  "bg-linen",
];
export async function getStaticProps({ params }) {
  const { bookId } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["getBook", bookId],
    () => fetchBook(bookId),
    {
      staleTime: 360000,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default function BookDescription(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const { bookId } = router.query;

  const { data: book, isLoading } = useQuery<Book>(
    ["getBook", bookId],
    () => fetchBook(String(bookId)),
    {
      enabled: bookId.length > 0,
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-max w-full flex-col gap-5 px-10 py-5">
      <div className="flex h-full w-full flex-col items-center gap-4 rounded-3xl border-black bg-[#fef1e0] py-6 px-4">
        <div className="flex w-full justify-between">
          <button onClick={() => router.back()} className="">
            <HiChevronLeft className="h-10 w-10" />
          </button>
          <button
            onClick={() => {
              console.log("favorite");
            }}
            className=""
          >
            <AiOutlineHeart className="h-8 w-8" />
          </button>
        </div>
        <Image
          className="mx-auto flex h-full w-auto rounded-xl"
          src={book.image ? book.image : "https://picsum.photos/80/120"}
          alt={book.title}
          width={160}
          height={240}
          layout={"fixed"}
          objectFit={"fill"}
        />
        <div className="flex w-full flex-col items-center text-center">
          <p className="w-full text-lg font-bold">{book.title}</p>
          <p className="text-slate-500 w-full text-sm">by {book.author}</p>
        </div>
      </div>
      <div className="flex flex-col pl-2">
        <div className="border-l-2 pl-2">
          <p className="text-xl font-bold">Description</p>
          <p className="text-gray-400 text-sm">{book.description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {Object.entries(book.genres).map(([key, value], index) => {
          console.log(key);
          return (
            <p
              key={key}
              className={`${
                tagColors[index % tagColors.length]
              } w-fit rounded-lg   px-2  py-1 text-black`}
            >
              {value}
            </p>
          );
        })}
      </div>
      <div className="flex justify-between gap-2">
        <CustomButton onClick={() => {}} functionality="ExternalApp">
          <FaTelegram />
          Message user
        </CustomButton>
        <CustomButton onClick={() => {}} functionality="ExternalApp">
          <GoLocation className="text-white" />
          Open in maps
        </CustomButton>
      </div>
    </div>
  );
}
