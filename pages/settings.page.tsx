import { useState } from "react";
import { CustomButton } from "../components/button/Button";

export default function Settings() {
    const languages = ["English-EN", "Deutsch-DE", "اَلْعَرَبِيَّةُ"];
    const [isActive, setIsActive] = useState(false);
    const [isChecked, setIsChecked] = useState(
        languages.reduce((acc, current) => {
            acc[current] = false;
            return acc;
        }, {})
    );
    return (
        <div className="ml-10 flex  w-mobile max-w-[1024] flex-col">
            <p className="text-slate-500 mt-5 mb-5 -ml-4 font-medium">
                Settings
            </p>
            <div>
                <p className="text-customGreen mb-2">Locations</p>
                <select
                    placeholder="04107"
                    name=""
                    id=""
                    className="text-customGrey w-[300px] py-2 pl-1 outline-none"
                >
                    <option className="" value="">
                        04107
                    </option>
                </select>
            </div>
            <div>
                <p className="text-customGreen mt-5 mb-1">Language</p>
                <form className="flex w-[300px] flex-col border-t-2 ">
                    {languages.map((language, idx) => (
                        <label
                            key={language}
                            className="flex gap-1  border-2 border-t-0 p-1 pl-5"
                        >
                            <input
                                type="checkbox"
                                name=""
                                checked={isChecked[language]}
                                onChange={(event) =>
                                    setIsChecked({
                                        ...isChecked,
                                        [language]: event.target.checked,
                                    })
                                }
                                className="mr-1 rounded outline-none focus:ring-0"
                            />
                            {language}
                        </label>
                    ))}
                </form>
                <button className=" text-customGreen mt-7">
                    Delete Account
                </button>
            </div>
            <div className="mt-12  flex flex-col self-center">
                <CustomButton
                    functionality={"ConfirmationPrimary"}
                    onClick={() => {}}
                >
                    save Changes
                </CustomButton>
                <button className="text-customGreen mt-4 outline-none">
                    {" "}
                    cancel
                </button>
            </div>
        </div>
    );
}
