type FetchBookProps = {
	genre?: any;
	title?: string;
	orderBy?: string;
	author?: string;
	language?: string;
	availability?: boolean;
};

export default function fetchBooks({
	availability = true,
	author,
	title,
	genre,
	language,
}: FetchBookProps) {
	const host =
		process.env.NODE_ENV == "production"
			? process.env.NEXT_PUBLIC_PROD_HOST
			: process.env.NEXT_PUBLIC_DEV_HOST;

	return fetch(
		`http://${host}/api/book?availability=${availability}&title=${title}&author=${author}&language=${language}&genres=${genre}`,
		{
			method: "GET",
		}
	).then((res) => {
		return res.json();
	});
}
