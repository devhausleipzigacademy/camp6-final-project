import { z } from "zod";

// Zod Model for posting locations
export const postLocation = z.object({
	postalAddressCountry: z.string(),
	postalAddressRegion: z.string(),
	postalAddresspostalCode: z
		.number()
		.int()
		.step(5, "German Zip Code must contain exactly five numbers."),
	postalAddressStreetAddress: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	userId: z.string(),
});

// Zod Model for getting Location
export const getLocation = postLocation.extend({
	identifier: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type PostLocation = z.infer<typeof postLocation>;

export type GetLocation = z.infer<typeof getLocation>;
