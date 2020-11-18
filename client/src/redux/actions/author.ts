import { Dispatch } from 'redux'

import {
  ADD_AUTHOR,
  REMOVE_AUTHOR,
  FETCH_AUTHORS,
  AuthorActions,
  Author,
} from '../../types/index'

export function addAuthor(author: Author): AuthorActions {
  return {
    type: ADD_AUTHOR,
    payload: {
      author,
    },
  }
}

export function removeAuthor(author: Author): AuthorActions {
  return {
    type: REMOVE_AUTHOR,
    payload: {
      author,
    },
  }
}

export function fetchAuthors(authors: Author[]): AuthorActions {
  return {
    type: FETCH_AUTHORS,
    payload: {
      authors,
    },
  }
}

// Async action processed by redux-thunk middleware
export function fetchAuthor(authorName: string) {
  return (dispatch: Dispatch) => {
    return fetch(`/countries/${authorName}`)
      .then((resp) => resp.json())
      .then((author) => {
        dispatch(addAuthor(author))
      })
  }
}

export function fetchAllAuthors() {
  const url = `http://localhost:3000/api/v1/authors`
  return (dispatch: Dispatch) => {
    return fetch(url)
    .then((resp) => resp.json())
    .then((authors) => {
      dispatch(fetchAuthors(authors))
    })
  }
}




  
