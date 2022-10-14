import { useRouter } from "next/router";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";

export const initialState = {
  title: "",
  author: "",
  zip: "",
  language: "",
};

const fieldNames: Record<keyof typeof initialState, string> = {
  title: "Title",
  author: "Author",
  zip: "Postal Code",
  language: "Language",
};

export default function AddPage() {
  let router = useRouter();
  let [formState, setFormState] = useState(initialState);
  let [error, setError] = useState("");
  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!formState.title) {
      setError("Please provide a title");
      return;
    }
    if (!formState.zip) {
      setError("Please provide a postal code");
      return;
    }
    router.push({
      pathname: "/suggestion",
      query: formState,
    });
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {Object.entries(formState).map(([k, v]) => (
          <Input
            key={k}
            name={k as keyof typeof initialState}
            label={fieldNames[k]}
            value={v}
            updater={(evt) => {
              setFormState({ ...formState, [k]: evt.target.value });
            }}
          />
        ))}
        <button type="submit" className="bg-green p-2 text-white">
          Submit Book
        </button>
        {error && <p className="text-center text-[red]">{error}</p>}
      </form>
    </div>
  );
}

interface InputProps {
  name: keyof typeof initialState;
  label: string;
  value: string;
  updater: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ name, label, value, updater }: InputProps) {
  return (
    <label htmlFor={name} className="flex flex-col gap-2">
      {label}
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={updater}
      />
    </label>
  );
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
