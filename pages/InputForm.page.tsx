import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { CustomButton } from "../components/button/Button";
import { LanguageSearchBar } from "../components/SearchBars/LanguageSearchBar";

function InputForm() {
    const [selectedLang, setSelectedLang] = useState(null);
    const [queryy, setQuerry] = useState("");

    // const filter=querty===''?

    return (
        <>
            <div className="flex w-mobile flex-col p-10 outline-none  ">
                <div className=" mb-10 grid    grid-flow-col  border-b-2   ">
                    <button
                        onClick={() => console.log("triggered")}
                        className="outline-none"
                    >
                        <AiOutlineClose className="text-slate-400 self-center text-center" />
                    </button>
                    <p className=" text-pink-400 mb-4 text-2xl">
                        New Book Information
                    </p>
                </div>
                <form className="px-4">
                    <div className="flex  flex-col">
                        <p className=" text-slate-400 text-start">Title</p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 outline-none"
                        />
                        <p className=" text-slate-400 text-start">Author</p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 outline-none"
                        />
                        <p className=" text-slate-400 text-start">
                            Postal Code
                        </p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 outline-none"
                        />
                        <p className=" text-slate-400 text-start">Telegram</p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 outline-none"
                        />

                        <form className="mb-2 border-b-2 outline-none">
                            <p className="text-slate-400">Language</p>
                            <LanguageSearchBar />
                        </form>
                    </div>
                </form>
                <button className="text-slate-400 text-end text-xs underline">
                    additional info
                </button>

                <CustomButton
                    functionality="ConfirmationPrimary"
                    onClick={() => {}}
                >
                    Submit Book
                </CustomButton>
            </div>
        </>
    );
}

export default InputForm;
