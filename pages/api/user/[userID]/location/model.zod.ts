import { z } from "zod";

// Zod Model for posting locations
export const postLocation = z.object({
	latitude: z.number(),
	longitude: z.number(),
	postalAddressCountry: z.string().optional(),
	postalAddressRegion: z.string().optional(),
	postalAddressPostalCode: z
		.number()
		.int()
		.step(5, "German Zip Code must contain exactly five numbers.")
		.optional(),
	postalAddressStreetAddress: z.string().optional(),
});

// Zod Model for getting Location
export const getLocation = postLocation.extend({
	identifier: z.string(),
	createdAt: z.date(),

	// optional values are returned as null from prisma hence getBook model needs to account for that
	postalAddressCountry: z.union([z.string(), z.null()]),
	postalAddressRegion: z.union([z.string(), z.null()]),
	postalAddressPostalCode: z.union([z.number(), z.null()]),
	postalAddressStreetAddress: z.union([z.string(), z.null()]),
});

export type PostLocation = z.infer<typeof postLocation>;

export type GetLocation = z.infer<typeof getLocation>;
