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
            <div className="flex  flex-col p-10 outline-none  ">
                <div className=" mb-10 grid    grid-flow-col  border-b-2 border-grey  ">
                    <button
                        onClick={() => console.log("triggered")}
                        className="outline-none"
                    >
                        <AiOutlineClose className="text-grey self-center text-center " />
                    </button>
                    <p className=" text-dustyRose mb-4 text-2xl">
                        New Book Information
                    </p>
                </div>
                <form className="px-4">
                    <div className="flex  flex-col">
                        <p className=" text-grey text-start border-grey">Title</p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 border-grey outline-none"
                        />
                        <p className=" text-grey text-start">Author</p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 outline-none border-grey"
                        />
                        <p className=" text-grey text-start ">
                            Postal Code
                        </p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 outline-none border-grey"
                        />
                        <p className=" text-grey text-start">Telegram</p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 outline-none border-grey"
                        />

                        <form className="mb-2 border-b-2 outline-none border-grey">
                            <p className="text-grey">Language</p>
                            <LanguageSearchBar />
                        </form>
                    </div>
                </form>
                <button className="text-grey text-end text-xs underline">
                    additional info
                </button>

                <div className="self-center mt-10">
                    <CustomButton
                    
                        functionality="ConfirmationPrimary"
                        onClick={() => {}}
                    >
                        Submit Book
                    </CustomButton>
                </div>
            </div>
        </>
    );
}

export default InputForm;
