import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

export function Footer() {
  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center border-t border-textGrey/40 p-4">
      <Link href="/add">
        <a>
          <PlusCircleIcon className="h-10 w-10 text-green" />
        </a>
      </Link>
    </div>
  );
}
