type DenyRequestProps = {
  identifier: string;
};

export default function denyRequest({ identifier }: DenyRequestProps) {
  const host =
    process.env.NODE_ENV == "production"
      ? process.env.NEXT_PUBLIC_PROD_HOST
      : process.env.NEXT_PUBLIC_DEV_HOST;

  return fetch(`${host}/api/request?identifier=${identifier}`, {
    method: "DELETE",
  }).then((res) => {
    return res.json();
  });
}
