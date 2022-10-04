type FetchBookProps = {
	genres?: Array<string>;
	orderBy?: string;
	availability?: boolean;
};

export default function fetchBooks({ availability, genres }: FetchBookProps) {
	console.log(genres);
	const host =
		process.env.NODE_ENV == "production"
			? process.env.NEXT_PUBLIC_PROD_HOST
			: process.env.NEXT_PUBLIC_DEV_HOST;

	return fetch(
		`http://${host}/api/book?availability=${availability}&genres=${genres}`,
		{
			method: "GET",
		}
	).then((res) => {
		return res.json();
	});
}
