import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { CustomButton } from "../components/button/Button";
import { LanguageSearchBar } from "../components/SearchBars/LanguageSearchBar";

function InputForm() {

    const router = useRouter() 
       const [selectedLang, setSelectedLang] = useState(null);
    const [queryy, setQuerry] = useState("");

    // const filter=querty===''?

    return (
        <>
            <div className="flex  flex-col p-10 outline-none  ">
                <div className=" mb-10 grid    grid-flow-col  border-b-2 border-grey  ">
                    {" "}
                    <button className="outline-none"
                    onClick={()=>router.back()}>
                        <AiOutlineClose className="self-center text-center text-grey " />
                    </button>{" "}

                    <p className=" mb-4 text-2xl text-dustyRose">New Book Information</p>
                </div>

                <form className="px-4">
                    <div className="flex  flex-col">
                        <p className=" border-grey text-start text-grey">Title</p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 border-grey outline-none"
                        />
                        <p className=" text-start text-grey">Author</p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 border-grey outline-none"
                        />
                        <p className=" text-start text-grey ">Postal Code</p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 border-grey outline-none"
                        />
                        <p className=" text-start text-grey">Telegram</p>
                        <input
                            type="text"
                            placeholder=""
                            className="mb-2 border-b-2 border-grey outline-none"
                        />

                        <div className="mb-2 border-b-2 border-grey outline-none">
                            <p className="text-grey">Language</p>
                            <LanguageSearchBar />
                        </div>
                    </div>
                </form>
                <button className="text-end text-xs text-grey underline">
                    additional info
                </button>

                <div className="mt-10 self-center">
                    <CustomButton functionality="ConfirmationPrimary" onClick={() => { }}>
                        Submit Book
                    </CustomButton>
                </div>
            </div>
        </>
    );
}

export default InputForm;
