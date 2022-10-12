import { User, Location } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchLocation, {
	createLocation,
	deleteLocation,
} from "../utils/fetchLocation";
import fetchLocations from "../utils/fetchLocations";
import { fetchUser } from "../utils/fetchUser";

export default function TestPage() {
	const { data: user, isLoading: userLoading } = useQuery<User>(["user"], () =>
		fetchUser("039e5731-960c-475e-8314-7fa61197217b")
	);

	const { data: location, status: locationsStatus } = useQuery<Location[]>(
		["locations"],
		() =>
			fetchLocations({
				userId: "195c47b7-677a-43b0-b359-10de5b88e261",
			})
	);

	const LocationData = {
		latitude: 41.40338,
		longitude: 2.17403,
	};

	const queryClient = useQueryClient();

	const mutation = useMutation(createLocation, {
		onSuccess: () => {
			queryClient.invalidateQueries(["locations"]);
		},
	});

	const deleteMutate = useMutation(deleteLocation, {
		onSuccess: () => {
			queryClient.invalidateQueries(["locations"]);
		},
	});

	if (locationsStatus === "loading") {
		return <p>Loading...</p>;
	}
	if (locationsStatus === "error") {
		return <p>Oops, something went wrong.</p>;
	}

	return (
		<>
			{location.map((location) => (
				<p key={location.identifier}>{location.latitude}</p>
			))}
			<button
				className="m-2 bg-green p-2"
				onClick={() => {
					mutation.mutate({
						userId: "195c47b7-677a-43b0-b359-10de5b88e261",
						data: LocationData,
					});
				}}
			>
				Create LOCATION
			</button>
			<button
				className="m-2 bg-grey p-2"
				onClick={() => {
					deleteMutate.mutate({
						userId: "195c47b7-677a-43b0-b359-10de5b88e261",
						locationId: location[0].identifier,
					});
				}}
			>
				DELETE LOCATION
			</button>
		</>
	);
}
