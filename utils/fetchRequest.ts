import { Request } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const host =
  process.env.NODE_ENV == "production"
    ? process.env.NEXT_PUBLIC_PROD_HOST
    : process.env.NEXT_PUBLIC_DEV_HOST;

export function fetchRequest(requestId: string): Promise<Request> {
  return fetch(`${host}/api/request/${requestId}`, {
    method: "GET",
  }).then((res) => {
    return res.json();
  });
}

export function useDeleteRequest(requestIdentifier: string) {
  const queryClient = useQueryClient();
  return useMutation(
    ["requests", requestIdentifier, "delete"],
    () => {
      return fetch(`${host}/api/request/${requestIdentifier}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["requests"]);
      },
    }
  );
}

export function useDeleteRequests(bookIdentifier: string) {
  const queryClient = useQueryClient();
  return useMutation(
    ["requests", bookIdentifier, "delete"],
    () => {
      return fetch(`${host}/api/request?bookId=${bookIdentifier}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["requests"]);
      },
    }
  );
}
