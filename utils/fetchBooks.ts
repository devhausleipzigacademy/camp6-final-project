type FetchBookProps = {
	category?: string;
	orderBy?: string;
	availability?: boolean;
};

export default function fetchBooks({
	category,
	orderBy,
	availability = true,
}: FetchBookProps) {
	const host =
		process.env.NODE_ENV == "production"
			? process.env.NEXT_PUBLIC_PROD_HOST
			: process.env.NEXT_PUBLIC_DEV_HOST;

	return fetch(
		`http://${host}/api/book?availability=${availability}&category=${category}&orderBy=${orderBy}`,
		{
			method: "GET",
		}
	).then((res) => {
		return res.json();
	});
}
