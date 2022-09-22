import Image, { StaticImageData } from "next/future/image";
import Link from "next/link";
import React, { useState } from "react";
import Thraxas from "../../public/testingImages/thraxas_and_the_dance_of_death.jpg";
import { FiHeart } from "react-icons/fi";
import clsx from "clsx";

const bookSizes = {
  homepage: "h-54",
  previewGrid: "h-45",
  listItem: "h-20",
  confirmationScreen: "h-89",
};
interface BookPreviewProps {
  /**
   * Source of Image?
   */
  imgSrc: string | StaticImageData;
  /**
   * Alt text of image?
   */
  imgAlt: string;
  /**
   * Link target of where preview takes you to
   */
  linkHref: string;
  /**
   * Determine context and and size of component
   */
  bookSize: keyof typeof bookSizes;
}

/**
 * Book thumbnail that can be used in lists and overviews. Aspet ratio fixed to prevent distorted images.
 */
export const BookPreview = ({
  bookSize,
  imgSrc = Thraxas,
  imgAlt = "School of Athens",
  linkHref,
  ...props
}: BookPreviewProps) => {
  const [faved, setFaved] = useState(false);

  // TODO: if we change design for larger screen we need to modify the sizes below.
  let sizes = "100vw";
  switch (bookSize) {
    case "previewGrid":
      sizes = "40vw";
      break;
    case "homepage":
      sizes = "28vw";
      break;
    case "confirmationScreen":
      sizes = "62vw";
      break;
    case "listItem":
      sizes = "17vw";
      break;
    default:
      break;
  }

  function toggleFavorite() {
    console.log(faved);
    setFaved(!faved);
  }

  const imageLink = (
    <Link href={linkHref}>
      <a>
        <Image
          src={imgSrc}
          fill
          alt={imgAlt}
          sizes={sizes}
          title={imgAlt}
          style={{ objectFit: "contain" }}
        />
      </a>
    </Link>
  );

  if (bookSize === "previewGrid") {
    return (
      <div
        className={clsx(
          bookSizes[bookSize],
          "relative flex aspect-6/9 w-fit items-center justify-center bg-linen"
        )}
      >
        <div className="relative h-5/6 w-5/6  bg-linen">{imageLink}</div>
        <div className="absolute bottom-0 right-0 flex aspect-square w-1/5 items-center   justify-center bg-white  text-gray-400 opacity-90 ">
          <button onClick={toggleFavorite}>
            <FiHeart
              className="h-full w-full p-1"
              fill={faved ? "darkred" : "none"}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        bookSizes[bookSize],
        "relative aspect-6/9 w-fit bg-linen  drop-shadow-book"
      )}
    >
      {imageLink}
    </div>
  );
};
