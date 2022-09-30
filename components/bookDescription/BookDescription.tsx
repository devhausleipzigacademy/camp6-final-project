import Image from "next/image";
import { ReactNode } from "react";
import { CSSProperties } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiChevronLeft } from "react-icons/hi";

import { CustomButton } from "../button/Button";
import { ExampleTags } from "./BookDescribtion.story";

function event() {
  return console.log("event triggered");
}

export type BookDescriptionProps = {
  backButtonHandler: Function;
  likedButtonHandler: Function;
  title: String;
  author: String;
  description: String;
  image: String;
  children: [ReactNode, ReactNode, ReactNode];
  onClick: () => void;
  backgroundColor: String;
};

export function BookDescription({
  backButtonHandler,
  likedButtonHandler,
  title,
  author,
  description,
  image,
  children,
  backgroundColor,
  ...props
}: BookDescriptionProps) {
  const [Tags, GoogleButton, TelegramButton] = children;

  const myLoader = () => {
    return `http://gingkopress.com/wp/wp-content/uploads/product_images/palate-palette/c01.jpg`;
  };
  return (
    <>
      <div className="flex w-mobile flex-col items-center py-5">
        <div
          style={{ backgroundColor } as CSSProperties}
          className="relative my-5 h-fit  rounded-3xl bg-[#fef1e0] px-36 py-20 "
        >
          <div>
            <button {...props} className="absolute  left-1 top-4">
              <HiChevronLeft className="h-10 w-10" />
            </button>
            <button {...props} className="absolute top-4 right-3">
              <AiOutlineHeart className="h-8 w-8" />
            </button>
          </div>
          <div className="">
            <Image
              className="rounded-xl "
              loader={myLoader}
              src={image as string}
              alt="Picture of the author"
              width={215}
              height={300}
            />
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold">{title}</p>
              <p className="text-slate-500 text-lg">by {author}</p>
            </div>
          </div>
        </div>
        <div className="ml-10 flex flex-col pl-2">
          <div className=" border-l-2 pl-2">
            <p className="mb-2 text-xl font-bold">Description</p>
            <p className="text-gray-400">{description}</p>
          </div>
          <ExampleTags />
        </div>
        <div className="my-10 flex gap-7">
          <CustomButton {...props} functionality="ExternalApp">
            <FaTelegram />
            Message user
          </CustomButton>
          <CustomButton {...props} functionality="ExternalApp">
            <GoLocation className="text-white" />
            Open in maps
          </CustomButton>
        </div>
      </div>
    </>
  );
}

export default BookDescription;
