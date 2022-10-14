export type BooksResponse = {
  totalItems: number;
  items: GoogleBook[];
};

export type GoogleBook = {
  title: string;
  authors: string[];
  description: string;
  categories: string[];
  language: string;
  imageLinks: {
    thumbnail: string;
  };
  publishedDate: string;
  industryIdentifiers: { type: "ISBN_13" | "ISBN_10"; identifier: string }[];
};
