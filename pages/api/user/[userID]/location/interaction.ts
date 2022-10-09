// package imports
import { Prisma } from "@prisma/client";

// local imports
import { prisma } from "../../../../../prisma/db";

// TODO: data prop should have type PostLocation but that leads to error - check whether we can fix error (same for book interaction)
export async function createLocation(data) {
	console.log("hello", data);
	const locationModel = await prisma.location.create({
		data: {
			...data,
		},
	});

	return locationModel;
}

type Clauses = Array<Prisma.LocationWhereInput>;

export async function retrieveLocations(clauses) {
	const locationModels = await prisma.location.findMany({
		where: {
			AND: clauses,
		},
		orderBy: { createdAt: "desc" },
	});
	return locationModels;
}

export async function retrieveLocation(locationId) {
	const locationModel = await prisma.location.findFirstOrThrow({
		where: { identifier: locationId },
	});
	return locationModel;
}

export async function deleteLocation(locationId) {
	const deletedLocation = await prisma.location.delete({
		where: {
			identifier: locationId,
		},
	});
	return deletedLocation;
}
