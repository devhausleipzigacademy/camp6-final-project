import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export function HomeSearchBar() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.length === 0) {
      setError("Please enter a search term");
    } else {
      setError("");
      router.push(`/search/${query}`);
    }
  }

  return (
    <div className="mt-5 mb-10 flex flex-col items-center justify-center self-center font-montserrat text-sm font-light text-textGrey">
      <form
        onSubmit={handleSubmit}
        className="flex rounded-lg border-2 border-searchBar pr-1"
      >
        <Link href={`/search/${query}`}>
          <a className=" flex aspect-square h-full justify-center self-start">
            <FiSearch className="h-10 w-10 stroke-2 p-1 pl-3 text-searchBar" />
          </a>
        </Link>
        <input
          type="text"
          className="focus:outline-none"
          value={query}
          onChange={(event) => {
            setError("");
            setQuery(event.target.value);
          }}
        />
        <input type="submit" hidden />
        <input
          id="search-form-button"
          type="text"
          className="h-full  w-20 border-l-2 border-searchBar pl-2 placeholder-textGrey 
                    placeholder:underline  placeholder:decoration-1 focus:placeholder-opacity-0 focus:outline-none"
          placeholder="in 04103"
        />
      </form>
      {error && <p className="error text-[#ff0000]">{error}</p>}
    </div>
  );
}
