import {
  BookState,
  BookActions,
  ADD_BOOK,
  REMOVE_BOOK,
  FETCH_BOOKS
} from '../../types/index'

export default function book(
  state: BookState = {
    allBooks: [],
    inCart: []
  },
  action: BookActions
): BookState {
  switch (action.type) {
  case ADD_BOOK: {
    const { book } = action.payload
    if (state.allBooks.find((c) => c.title === book.title)) {
      return state
    }
    // Always return new state (e.g, new object) if changed
    return { ...state, allBooks: [...state.allBooks, book] }
  }

  case REMOVE_BOOK: {
    const { book } = action.payload
    const index = state.allBooks.findIndex((c) => c._id === book._id)
    if (index >= 0) {
      state.allBooks.splice(index, 1)
      return { ...state, allBooks: [...state.allBooks] }
    }
    return state
  }

  case FETCH_BOOKS: {
    const { books } = action.payload
      return { ...state, allBooks: books }
  }

  default:
    return state
  }
}