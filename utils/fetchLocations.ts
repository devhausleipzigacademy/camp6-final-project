const host =
	process.env.NODE_ENV == "production"
		? process.env.NEXT_PUBLIC_PROD_HOST
		: process.env.NEXT_PUBLIC_DEV_HOST;

type FetchLocationsProps = {
	userId: String;
	hasBooks?: Boolean;
};

export default function fetchLocations({
	userId,
	hasBooks,
}: FetchLocationsProps) {
	let URLString = `http://${host}/api/user/${userId}/location?`;

	if (hasBooks !== undefined) {
		URLString += `hasBooks=${hasBooks}&`;
	}

	return fetch(URLString, {
		method: "GET",
	}).then((res) => {
		if (!res.ok) throw Error;
		return res.json();
	});
}
