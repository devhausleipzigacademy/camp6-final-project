import Image, { StaticImageData } from "next/future/image";
import Link from "next/link";
import Thraxas from "../../public/thraxas_and_the_dance_of_death.jpg";

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
	 * How large should the image be?
	 */
	height: string;
	/**
	 * Link target of where preview takes you to
	 */
	linkHref: string;
	/**
	 * Annoying nextjs image prop?
	 */
	sizes: string;
}

/**
 * Book thumbnail that can be used in lists and overviews.
 */
export const BookPreview = ({
	imgSrc = Thraxas,
	imgAlt = "School of Athens",
	sizes = "30vw",
	height = "128px",
	linkHref,

	...props
}: BookPreviewProps) => {
	return (
		<div
			className="relative aspect-6/9 w-fit bg-slate-600"
			style={{ height: height }}
		>
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

			<div className="absolute right-3 -bottom-2 -z-10 ml-10 h-bookShadow w-full bg-slate-200"></div>
		</div>
	);
};
