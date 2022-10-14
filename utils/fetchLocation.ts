import { Location } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostLocation } from "../pages/api/user/[userId]/location/model.zod";

const host =
  process.env.NODE_ENV == "production"
    ? process.env.NEXT_PUBLIC_PROD_HOST
    : process.env.NEXT_PUBLIC_DEV_HOST;

interface FetchLocationProps {
  userId: string;
  locationId: string;
}

export default function fetchLocation({
  userId,
  locationId,
}: FetchLocationProps): Promise<Location> {
  return fetch(`${host}/api/user/${userId}/location/${locationId}`, {
    method: "GET",
  }).then((res) => {
    if (!res.ok) throw Error;
    return res.json();
  });
}

export function deleteLocation({ userId, locationId }: FetchLocationProps) {
  return fetch(`${host}/api/user/${userId}/location/${locationId}`, {
    method: "DELETE",
  });
}

interface UseCreateLocationProps {
  userId: string;
  data: PostLocation;
}

export function createLocation({ userId, data }: UseCreateLocationProps) {
  return fetch(`${host}/api/user/${userId}/location/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
