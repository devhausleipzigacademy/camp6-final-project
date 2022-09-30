import Image from "next/future/image";
import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiChevronLeft } from "react-icons/hi";
import { ExampleTags } from "../../components/bookDescription/BookDescribtion.story";
import { CustomButton } from "../../components/button/Button";
import Thraxas from "../public/testingImages/thraxas_and_the_dance_of_death.jpg";
import languagesJSON from "../../enums/ISO-languages.json";
import useGetBook from "../../hooks/useGetBook";
import { StringIterator } from "lodash";
import { Book } from "@prisma/client";

export async function getServerSideProps({ params, query, req, res }) {
    const { bookId } = params;

    const { data: book } = useGetBook(String(bookId));

    return {
        props: {
            book,
        },
    };
}

type BookDescriptionProps = {
    book: Book;
};

export default function BookDescription({ book }: BookDescriptionProps) {
    const router = useRouter();

    return (
        <div className="flex w-mobile flex-col items-stretch py-5 px-10">
            <div className="relative my-5 h-fit  rounded-3xl bg-[#fef1e0] px-36 py-20 ">
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
                    <Image
                        className="rounded-xl "
                        src={book.image}
                        alt={book.title}
                    />
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-bold">{book.title}</p>
                        <p className="text-slate-500 text-lg">
                            by {book.author}
                        </p>
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
