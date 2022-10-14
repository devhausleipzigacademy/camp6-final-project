const host =
  process.env.NODE_ENV == "production"
    ? process.env.NEXT_PUBLIC_PROD_HOST
    : process.env.NEXT_PUBLIC_DEV_HOST;

type FetchBookProps = {
  genre?: any;
  title?: string;
  orderBy?: "createdAt" | "title" | "isAvailable";
  author?: string;
  language?: string;
  isAvailable?: boolean;
  borrowed?: boolean;
  likedBy?: string;
};

export default function fetchBooks({
  isAvailable,
  author,
  title,
  genre,
  language,
  borrowed,
  likedBy,
}: FetchBookProps) {
  let URLString = `http://${host}/api/book?`;

  if (isAvailable !== undefined) {
    URLString += `isAvailable=${isAvailable}&`;
  }

  if (title !== undefined) {
    URLString += `title=${title}&`;
  }

  if (author !== undefined) {
    URLString += `author=${author}&`;
  }

  if (language !== undefined) {
    URLString += `language=${language}&`;
  }

  if (genre !== undefined) {
    URLString += `genre=${genre}&`;
  }

  if (borrowed !== undefined) {
    URLString += `borrowed=${borrowed}&`;
  }

  if (likedBy !== undefined) {
    URLString += `likedBy=${likedBy}&`;
  }

  return fetch(URLString, {
    method: "GET",
  }).then((res) => {
    return res.json();
  });
}
