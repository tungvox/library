import { Dispatch } from 'redux'

import {
  ADD_BOOK,
  REMOVE_BOOK,
  FETCH_BOOKS,
  BookActions,
  Book,
} from '../../types/index'

export function addBook(book: Book): BookActions {
  return {
    type: ADD_BOOK,
    payload: {
      book,
    },
  }
}

export function removeBook(book: Book): BookActions {
  return {
    type: REMOVE_BOOK,
    payload: {
      book,
    },
  }
}

export function fetchBooks(books: Book[]): BookActions {
  return {
    type: FETCH_BOOKS,
    payload: {
      books,
    },
  }
}

// Async action processed by redux-thunk middleware
export function fetchBook(bookName: string) {
  return (dispatch: Dispatch) => {
    return fetch(`/countries/${bookName}`)
      .then((resp) => resp.json())
      .then((book) => {
        dispatch(addBook(book))
      })
  }
}

export function fetchAllBooks() {
  const url = `http://localhost:3000/api/v1/books`
  return (dispatch: Dispatch) => {
    return fetch(url)
    .then((resp) => resp.json())
    .then((books) => {
      dispatch(fetchBooks(books))
    })
  }
}




  
