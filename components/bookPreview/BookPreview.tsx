// package imports
import Image, { StaticImageData } from "next/future/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiHeart } from "react-icons/fi";
import clsx from "clsx";

// local imports
import { randomInt } from "../../utils/random";
import { updateBook } from "../../utils/updateBook";

const bookSizes = {
	homepage: "h-54",
	previewGrid: "h-45",
	listItemSmall: "h-20",
	listItemBig: "h-22",
	confirmationScreen: "h-89",
	carouselItem: "h-54",
};

const placeholderColors = ["bg-blue", "bg-salmon", "bg-dustyRose"];
interface BookPreviewProps {
	/**
	 * Source of Image?
	 */
	imgSrc?: string | StaticImageData;
	/**
	 * Book title?
	 */
	bookTitle;
	/**
	 * Book author?
	 */
	bookAuthor;
	/**
	 * Link target of where preview takes you
	 */
	linkHref: string;
	/**
	 * Is the book available for requesting and searching?
	 */
	isAvailable: boolean;
	/**
	 * Determine context and and size of component
	 */
	bookSize: keyof typeof bookSizes;
	/**
	 * Has the user added this book to their favorites?
	 */
	isFaved: boolean;
}

/**
 * Book thumbnail that can be used in lists and overviews. Aspect ratio fixed to prevent distorted images.
 */
export const BookPreview = ({
	isAvailable,
	bookSize,
	imgSrc,
	bookTitle,
	bookAuthor,
	linkHref,
	isFaved,
}: BookPreviewProps) => {
	const queryClient = useQueryClient();
	const [faved, setFaved] = useState(isFaved);
	const { mutate: borrowBook } = useMutation(updateBook, {
		onSuccess: () => {
			queryClient.invalidateQueries(["books"]);
		},
	});

	useEffect(() => {
		if (faved === true) {
			// if faved connect book to user
		} else {
			// disconnect book from user
		}
	}, []);

	function toggleFavorite() {
		setFaved((faved) => !faved);
	}

	const bgColor = placeholderColors[randomInt(3)];

	// TODO: if we change design for larger screen we need to modify the sizes below.
	let sizes = "100vw";
	let tinyText = false;
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
		case "listItemSmall":
			tinyText = true;
			sizes = "15vw";
			break;
		case "listItemBig":
			tinyText = true;
			sizes = "17vw";
			break;
		case "carouselItem":
			sizes = "28vw";
			var modifiedShadow = true;
			break;
		default:
			break;
	}

	// the actual image tag
	let imageTag;

	// if no image provide we fill image tag with placeholder
	if (!imgSrc) {
		imageTag = (
			<div
				id="test"
				className={clsx(
					"flex h-full w-full flex-col items-center justify-between p-4 text-center font-arno text-white",
					bgColor
				)}
			>
				<p
					className={clsx(tinyText ? "w-full truncate text-[11px]" : "text-sm")}
				>
					{bookTitle}
				</p>
				<p
					className={clsx(
						"w-full truncate",
						tinyText ? "text-[9px]" : "text-xs"
					)}
				>
					{bookAuthor}
				</p>
			</div>
		);
	} else {
		imageTag = (
			<Image
				src={imgSrc}
				fill
				alt={bookAuthor + ": " + bookTitle}
				sizes={sizes}
				title={bookTitle}
				style={{ objectFit: "contain" }}
			/>
		);
	}

	let unavailableOverlay = (
		<div className="relative flex h-full w-full items-center justify-center opacity-60 grayscale">
			{imageTag}
			<div className="fixed z-10  flex w-5/6 items-center justify-center rounded-3xl bg-textBlack p-5">
				<p
					className={clsx(
						tinyText ? "text-[9px] " : "text-inherit",
						"fixed font-arno font-bold text-white opacity-100"
					)}
				>
					unavailable
				</p>
			</div>
		</div>
	);

	if (bookSize === "previewGrid") {
		return (
			<div
				className={clsx(
					bookSizes[bookSize],
					"relative flex h-44 w-40 items-center justify-center bg-linen"
				)}
			>
				<div className="relative aspect-6/9 h-5/6 bg-linen drop-shadow">
					{isAvailable ? imageTag : unavailableOverlay}
				</div>
				<div className="text-gray-400 absolute bottom-0 right-0 flex aspect-square w-1/4 items-center justify-center bg-white opacity-90 ">
					<button
						className="flex h-full w-full items-center justify-center"
						onClick={toggleFavorite}
					>
						<FiHeart
							className={clsx(
								"h-5/6 w-5/6 stroke-1",
								faved ? "fill-salmon text-salmon" : "text-grey"
							)}
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
				"relative aspect-6/9 w-fit bg-linen",
				modifiedShadow ? "drop-shadow-carouselItem" : "drop-shadow"
			)}
		>
			<Link href={linkHref}>
				<a>{isAvailable ? imageTag : unavailableOverlay}</a>
			</Link>
		</div>
	);
};
