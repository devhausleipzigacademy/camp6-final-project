type FetchBookProps = {
    genre?: any;
    title?: string;
    orderBy?: string;
    author?: string;
    language?: string;
    availability?: boolean;
};

export default function fetchBooks({
    availability,
    author,
    title,
    genre,
    language,
}: FetchBookProps) {
    const host =
        process.env.NODE_ENV == "production"
            ? process.env.NEXT_PUBLIC_PROD_HOST
            : process.env.NEXT_PUBLIC_DEV_HOST;

    let URLString = `http://${host}/api/book?`;

    if (availability !== undefined) {
        URLString += `availability=${availability}&`;
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

    return fetch(URLString, {
        method: "GET",
    }).then((res) => {
        return res.json();
    });
}
