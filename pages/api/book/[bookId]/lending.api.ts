// PUT at '/book/[bookId]/lending' should contain:

// action: string ( 'borrow' | 'return' )
// bookId: string
// borrower: string
// action and borrower should be query parameters; borrower should only be a valid user, action 'borrow' should only be allowed for books that have no borrower, action 'return' should only be allowed for books with a borrower and only if the borrower id provided matches the borrower connected to the book in the DB
