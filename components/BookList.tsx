import { Book } from "./Book";

export function BookList() {
  const book = {
    title: "Hacking for Dummies",
    author: "Franz",
    excerpt: "I know a lot about recursion",
  };

  return (
    <div>
      <Book title={book.title} author={book.author} excerpt={book.excerpt} />
      <Book
        type="submit"
        className="flex flex-col"
        id="awesiome-button"
        hidden={false}
        {...book}
      />
    </div>
  );
}
