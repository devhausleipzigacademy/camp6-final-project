// package imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FetchRequestProps = {};

export function fetchRequests({}: FetchRequestProps) {
  const host =
    process.env.NODE_ENV == "production"
      ? process.env.NEXT_PUBLIC_PROD_HOST
      : process.env.NEXT_PUBLIC_DEV_HOST;

  return fetch(`${host}/api/request/`, {
    method: "GET",
  }).then((res) => {
    return res.json();
  });
}
