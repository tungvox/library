// export type BookCardProps = {
//   ISBN: number
//   title: string,
//   description: string,
//   publisher: string,
//   authors: string[],
//   status: string,
//   borrowerID: number,
//   publishedDate: Date,
//   borrowDate: Date,
//   returnDate: Date
// }

export type SearchAuthorProps = {
  handleSearch: Function
}

export type SearchBookProps = {
  handleSearch: Function
}

export type AuthorListProps = {
  filteredAuthors: Author[]
}

export type BookListProps = {
  filteredBooks: Book[]
}

export type BookCardProps = {
  book: Book
}

// Action types
export const ADD_AUTHOR = 'ADD_AUTHOR'
export const REMOVE_AUTHOR = 'REMOVE_AUTHOR'
export const FETCH_AUTHORS = 'FETCH_AUTHORS'

export const ADD_BOOK = 'ADD_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const FETCH_BOOKS = 'FETCH_BOOKS'


// A Book
export type Book = {
  _id : string
  ISBN: number
  title: string,
  description: string,
  publisher: string,
  authors: string[],
  status: string,
  borrowerID: number,
  publishedDate: Date,
  borrowDate: Date,
  returnDate: Date
}

export type AddBookAction = {
  type: typeof ADD_BOOK
  payload: {
    book: Book
  }
}

export type RemoveBookAction = {
  type: typeof REMOVE_BOOK
  payload: {
    book: Book
  }
}

export type FetchBooksAction = {
  type: typeof FETCH_BOOKS
  payload: {
    books: Book[]
  }
}

// An Author
export type Author = {
  _id: string
  firstName: string,
  lastName: string,
  email: string
}

export type AddAuthorAction = {
  type: typeof ADD_AUTHOR
  payload: {
    author: Author
  }
}

export type RemoveAuthorAction = {
  type: typeof REMOVE_AUTHOR
  payload: {
    author: Author
  }
}

export type FetchAuthorsAction = {
  type: typeof FETCH_AUTHORS
  payload: {
    authors: Author[]
  }
}

// Use this union in reducer
export type AuthorActions = AddAuthorAction | RemoveAuthorAction | FetchAuthorsAction
export type BookActions = AddBookAction | RemoveBookAction | FetchBooksAction

export type BookState = {
  allBooks: Book[]
  inCart: Book[] 
}

export type AuthorState = {
  allAuthors: Author[]
}



export type AppState = {
  book: BookState
  author: AuthorState
}