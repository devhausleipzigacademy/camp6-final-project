// package imports
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FetchRequestProps = {};

export function fetchRequests({}: FetchRequestProps) {
  const host =
    process.env.NODE_ENV == "production"
      ? process.env.NEXT_PUBLIC_PROD_HOST
      : process.env.NEXT_PUBLIC_DEV_HOST;

  return fetch(`http://${host}/api/request`, {
    method: "GET",
  }).then((res) => {
    return res.json();
  });
}

// export function useUpdateRequest(bookIdentifier: string) {
//   const queryClient = useQueryClient();
//   return useMutation(
//     ["requests", requestIdentifier, "update"],
//     (request: PutRequest) => {
//     {/* TODO: create Zod model*/}
//       return fetch(`http://${host}/api/request/${requestIdentifier}`, {
//         method: "PUT",
//         body: JSON.stringify(request),
//       });
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["books"]);
//       },
//     }
//   );
// }
