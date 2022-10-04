type FetchBookProps = {
    category?: string;
    orderBy?: string;
    availability?: boolean;
};

export default function fetchBooks({
    category,
    orderBy,
    availability = true,
}: FetchBookProps) {
    return fetch(
        `http://localhost:3000/api/book?availability=${availability}&category=${category}&orderBy=${orderBy}`,
        {
            method: "GET",
        }
    ).then((res) => {
        return res.json();
    });
}
