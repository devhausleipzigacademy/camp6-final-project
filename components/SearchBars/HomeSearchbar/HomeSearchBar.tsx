import clsx from "clsx";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdOptions } from "react-icons/io";

export function HomeSearchBar() {
  const placeHolderLang = ["English", "Turkish", "French", "Texas"];
  const [isActive, setIsActive] = useState(false);
  const [isChecked, setIsChecked] = useState(
    placeHolderLang.reduce((acc, current) => {
      acc[current] = false;
      return acc;
    }, {})
  );
  return (
    <div>
      <div className="min-w-mobile mt-4 flex w-mobile justify-center gap-6 bg-green-300 py-2">
        <div className="flex flex-wrap rounded-xl border-2 border-slate-300">
          <button className="rounded-l-lg bg-white pl-2 outline-none">
            <BsSearch className=" text-slate-300" />
          </button>
          <input
            type="text"
            className=" py-1 pl-3 outline-none"
            placeholder="Search"
          />
          <input
            type="text"
            className="w-24 rounded-r-lg border-l-2 border-slate-300 pl-2 text-xs outline-none "
            placeholder="#in 04179"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setIsActive((prev) => !prev)}
            data-bs-toggle="dropdown"
            type="button"
            className="dropdown-toggle relative self-center rounded-lg border-2  border-slate-200  bg-white p-2 text-slate-400 outline-none"
          >
            <IoMdOptions className="h-4 w-5 " />
          </button>
          <form
            className={clsx(
              isActive ? "opacity-100" : "invisible opacity-0 ",

              "absolute flex transform flex-col gap-y-2 rounded-lg bg-orange-200  py-2 px-4 text-start text-sm font-medium text-black  duration-500"
            )}
          >
            {placeHolderLang.map((language, idx) => (
              <label key={language} className="flex gap-1">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={isChecked[language]}
                  onChange={(event) =>
                    setIsChecked({
                      ...isChecked,
                      [language]: event.target.checked,
                    })
                  }
                  className=" mr-1 outline-none"
                />
                {language}
              </label>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
