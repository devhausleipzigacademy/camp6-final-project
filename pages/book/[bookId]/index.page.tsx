import { Book } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiChevronLeft } from "react-icons/hi";

import { CustomButton } from "../../../components/button/Button";
import { Tags } from "../../../components/tags/Tags";
import fetchBook from "../../../utils/fetchBook";

export default function BookDescription() {
  const router = useRouter();
  const bookId = router.query.bookId as string;

  const [sending, setSending] = useState(false);

  const { data: book, isLoading } = useQuery<Book>(
    ["getBook", bookId],
    () => fetchBook(String(bookId)),
    {
      enabled: !!bookId,
    }
  );

  function handleFavorite() {
    console.log("favorite");
  }

  if (isLoading) return <p>Loading...</p>;

  async function sendMessage() {
    try {
      setSending(true);
      const me = JSON.parse(localStorage.getItem("c6-tid"));
      console.log(me);
      const owner = await fetch(
        `http://bookshare.local/api/user/${book.ownerId}}`
      ).then((res) => res.json());
      await fetch(
        `http://bookshare.local/api/message/${me.tid}/${owner.telegramId}`
      );
      setSending(false);
    } catch (err) {
      console.log(err);
    }
  }

  // TODO: save sent message to db so we can disable the button if a message was already sent (prevent spamming)

  return (
    <div className="flex h-max w-full flex-col gap-5 px-10 py-5">
      <div className="flex h-full w-full flex-col items-center gap-4 rounded-3xl border-black bg-[#fef1e0] py-6 px-4">
        <div className="flex w-full justify-between">
          <button onClick={() => router.back()} className="">
            <HiChevronLeft className="h-10 w-10" />
          </button>
          <button onClick={handleFavorite}>
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
      <Tags book={book} />
      <div className="flex justify-between gap-6">
        <CustomButton
          disabled={sending}
          onClick={sendMessage}
          functionality="ExternalApp"
        >
          {sending ? (
            <span>Sending...</span>
          ) : (
            <>
              <FaTelegram />
              Message user
            </>
          )}
        </CustomButton>
        <CustomButton onClick={() => {}} functionality="ExternalApp">
          <GoLocation className="text-white" />
          Open in maps
        </CustomButton>
      </div>
    </div>
  );
}
